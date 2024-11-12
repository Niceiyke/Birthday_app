import openpyxl
from django.core.management.base import BaseCommand
import pandas as pd
from birthday.models import Worker
from django.db import transaction

class Command(BaseCommand):
    help = 'Upload worker data from an Excel (.xlsx) file to the database'

    def handle(self, *args, **kwargs):
        file_path = './birthday1.xlsx'

        try:
            wb = openpyxl.load_workbook(file_path)
            sheet = wb.active

            data = sheet.values
            columns = next(data)
            df = pd.DataFrame(data, columns=columns)

            # Convert DOB to datetime, coercing errors to NaT
            df['DOB'] = pd.to_datetime(df['DOB'], errors='coerce')

            # Filter out rows with NaT in DOB
            df = df.dropna(subset=['DOB'])

            self.stdout.write(self.style.SUCCESS(f"Filtered Data:\n{df.head()}"))

            workers_to_create = []

            for _, row in df.iterrows():
                try:
                    name = row['NAME']
                    date_of_birth = row['DOB']

                    workers_to_create.append(
                        Worker(
                            name=name,
                            birthday=date_of_birth,
                            sap=row['SAP'],
                            department=row['Department'],
                            position=row['Position'],
                            gender=row['Gender'],
                            cader=row['Cadre']
                        )
                    )

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Error processing row: {row}. Error: {e}"))

            with transaction.atomic():
                Worker.objects.bulk_create(workers_to_create)

            self.stdout.write(self.style.SUCCESS('Data upload complete.'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error processing the file: {e}"))
