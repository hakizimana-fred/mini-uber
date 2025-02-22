# Update the base image to Node.js 20
FROM node:20.11.1

# WORKDIR /app
WORKDIR /app/packages/user

# Copy root package.json and lerna.json
COPY package.json .
COPY lerna.json .
COPY yarn.lock .

# Copy the user service package.json
COPY packages/user/package.json ./packages/user/
COPY tsconfig.base.json ./tsconfig.base.json
COPY packages/user/tsconfig.json ./packages/user/
COPY packages/user/.env ./packages/user/

# Copy shared packages if any

# Install dependencies
RUN yarn install

# Copy service source code
COPY packages/user/src ./packages/user/src
COPY packages/utils/src ./packages/utils/src

# Build the service
# RUN  npm run dev

# Expose the port your service runs on
EXPOSE 4000

# Start the service
CMD ["yarn", "workspace", "user", "dev"]



