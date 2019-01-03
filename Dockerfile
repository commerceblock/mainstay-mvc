FROM centos:7.5.1804

ENV NODEURL https://rpm.nodesource.com/setup_10.x
ENV YARNURL https://dl.yarnpkg.com/rpm/yarn.repo

# Setup required packages

RUN set -x \
    && yum install -y epel-release \
    && curl -sL ${NODEURL} | bash - \
    && curl -sL ${YARNURL} | tee /etc/yum.repos.d/yarn.repo \
    && yum install -y \
        make \ 
        nodejs \ 
        git \
        yarn \
    && yum clean all \
    && rm -rf /var/cache/yum

COPY . /usr/src/mainstay-mvc
WORKDIR /usr/src/mainstay-mvc

RUN set -x \
    && cd /usr/src/mainstay-mvc \
    && yarn install

ENTRYPOINT ["/usr/src/mainstay-mvc/docker-entrypoint.sh"]
CMD ["node", "/src/api.js"]
