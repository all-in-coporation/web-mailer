FROM node:10-alpine

WORKDIR /opt/app

ENV PORT=80
# ENV SENDGRID_API_KEY='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'
ENV SENDGRID_API_KEY='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'
ENV SENDGRID_TO='hola@allinnightapp.com'

RUN touch /usr/bin/start.sh # this is the script which will run on start

# if you need a build script, uncomment the line below
# RUN echo 'sh mybuild.sh' >> /usr/bin/start.sh

# if you need redis, uncomment the lines below
# RUN apk --update add redis
# RUN echo 'redis-server &' >> /usr/bin/start.sh

# daemon for cron jobs
RUN echo 'echo will install crond...' >> /usr/bin/start.sh
RUN echo 'crond' >> /usr/bin/start.sh

# Basic npm start verification
RUN echo 'nb=`cat package.json | grep start | wc -l` && if test "$nb" = "0" ; then echo "*** Boot issue: No start command found in your package.json in the scripts. See https://docs.npmjs.com/cli/start" ; exit 1 ; fi' >> /usr/bin/start.sh

RUN echo 'npm install --production' >> /usr/bin/start.sh

# npm start, make sure to have a start attribute in "scripts" in package.json
RUN echo 'npm start' >> /usr/bin/start.sh
