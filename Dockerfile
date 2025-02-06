# Use the official PostgreSQL image
FROM postgres:16

# Set environment variables
ENV POSTGRES_USER=ramiro
ENV POSTGRES_PASSWORD=Htazzxs101
ENV POSTGRES_DB=dl_interactive_db

# Expose the PostgreSQL default port
EXPOSE 5432