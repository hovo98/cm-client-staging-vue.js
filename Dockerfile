FROM node:lts-alpine as build-stage

# Add ENV arguments
ARG VUE_APP_BACKEND_URL
ENV VUE_APP_BACKEND_URL ${VUE_APP_BACKEND_URL}

ARG VUE_APP_RECAPTCHA_SITE_KEY
ENV VUE_APP_RECAPTCHA_SITE_KEY ${VUE_APP_RECAPTCHA_SITE_KEY}

ARG VUE_APP_LANDING_PAGE_URL
ENV VUE_APP_LANDING_PAGE_URL ${VUE_APP_LANDING_PAGE_URL}

ARG VUE_APP_GOOGLE_MAPS_KEY
ENV VUE_APP_GOOGLE_MAPS_KEY ${VUE_APP_GOOGLE_MAPS_KEY}

# Build the app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Copy to nginx server
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY .do/.docker/nginx.conf /etc/nginx/nginx.conf
