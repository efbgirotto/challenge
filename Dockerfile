ARG NODE_VERSION="12.16.3"

###########################################################################
FROM node:${NODE_VERSION} as base

WORKDIR /app
COPY package.json package-lock.json /app/

RUN set -ex \
	&& npm set progress=false \
	&& npm config set depth 0 \
	&& npm install --quiet \
	&& npm cache clean --force

COPY . /app
EXPOSE 3000


###########################################################################
FROM base AS test

CMD ["npm", "test"]


###########################################################################
FROM base AS release

RUN npm prune --production
USER node
CMD ["npm", "start"]
