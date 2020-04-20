FROM docker.pkg.github.com/huulane/reclib/image:latest as ui-build

FROM node
WORKDIR /app
COPY package.json .

# China is special
# RUN npm config set registry https://registry.npm.taobao.org

RUN npm cache verify
RUN npm install

# Bundle app source
COPY . .
RUN ls
COPY --from=ui-build /app/dist /app/public
RUN ls

EXPOSE 3000