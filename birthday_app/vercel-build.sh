#!/bin/bash

# Run migrations
python manage.py migrate --noinput

# Create the superuser (you can set environment variables to avoid manual input)
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@admin.com', 'admin')" | python manage.py shell
