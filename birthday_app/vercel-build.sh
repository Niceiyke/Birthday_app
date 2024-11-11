#!/bin/bash
# Run migrations
python manage.py migrate --noinput

# Collect static files (if necessary)
python manage.py collectstatic --noinput
