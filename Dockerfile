# Stage 0 - build react app
From node:12 as build-stage

WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build

# Stage 1 - serve build app with Nginx
From nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf