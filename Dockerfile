FROM centos:7.5.1804

# Setup required system packages
RUN set -x \
    && yum install -y epel-release \
    && curl -sL https://rpm.nodesource.com/setup_10.x | bash - \
    && yum install -y \
        make \
        nodejs \
        git \
    && yum clean all \
    && rm -rf /var/cache/yum

COPY . /usr/src/mainstay-mvc
WORKDIR /usr/src/mainstay-mvc

RUN set -x \
    && npm install

ENTRYPOINT ["/usr/src/mainstay-mvc/docker-entrypoint.sh"]
CMD ["node", "/src/api.js"]
