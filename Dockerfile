FROM centos:7.5.1804

# Setup required system packages

RUN set -x \
&& yum install -y epel-release \
&& curl -sL https://rpm.nodesource.com/setup_10.x | bash - \
&& curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo \
&& yum install -y make nodejs git yarn \
&& yum clean all \
&& rm -rf /var/cache/yum

COPY . /usr/src/mainstay-mvc
WORKDIR /usr/src/mainstay-mvc

RUN set -x \
&& yarn

ENTRYPOINT ["/usr/src/mainstay-mvc/docker-entrypoint.sh"]
CMD ["node", "/src/api.js"]
