# User Service Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy root package.json and lerna.json
COPY package.json .
COPY lerna.json .
COPY yarn.lock .

# Copy the user service package.json
COPY packages/user/package.json ./packages/user/
COPY packages/user/tsconfig.json ./packages/user/

# Copy shared packages if any
COPY packages/utils/package.json ./packages/utils/

# Install dependencies
RUN yarn install

# Copy service source code
COPY packages/user/src ./packages/user/src
COPY packages/utils/src ./packages/utils/src

# Build the service
RUN cd packages/user && yarn build

# Expose the port your service runs on
EXPOSE 4000

# Start the service
CMD ["yarn", "workspace", "user", "start"]