FROM node:12.6
LABEL maintainer="vortexgin@gmail.com"
RUN npm install -g serve
COPY . /myinternalevents
WORKDIR /myinternalevents
RUN npm install -q
EXPOSE 8081
CMD ["/myinternalevents/run"]
