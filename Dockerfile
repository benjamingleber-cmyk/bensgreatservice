# Use a minimal nginx image to serve a single-page static site
FROM nginx:alpine

# Remove default content and copy our index
RUN rm -rf /usr/share/nginx/html/*
COPY index.html /usr/share/nginx/html/index.html

# Expose default HTTP port
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
