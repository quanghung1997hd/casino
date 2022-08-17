FROM node:14.19.1-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
LABEL name="smsbrandname_web" version="1.0"
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 10006

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
#ENV NUXT_PORT=10006

# start the app
CMD [ "npm", "start" ]
