FROM amazonlinux
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN yum update -y \\
    && yum install tar gzip procps -y
RUN curl https://install.meteor.com | sh

RUN yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

COPY package.json /app/package.json
RUN meteor npm i --silent

EXPOSE 3000
CMD ["meteor", "npm", "start"]

#
#packages:
#   yum:
#     pango: []
#     libXcomposite: []
#     libXcursor: []
#     libXdamage: []
#     libXext: []
#     libXi: []
#     libXtst: []
#     cups-libs: []
#     libXrandr: []
#     alsa-lib: []
#     ipa-gothic-fonts: []
#     xorg-x11-fonts-100dpi: []
#     xorg-x11-fonts-75dpi: []
#     xorg-x11-utils: []
#     xorg-x11-fonts-Type1: []
#     xorg-x11-fonts-misc: []
# commands:
#   clean-yum:
#     command: yum clean all
#   rpm-libepoxy:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/libepoxy-1.5.2-1.el7.x86_64.rpm
#   rpm-libxkbcommon:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/libxkbcommon-0.7.1-3.el7.x86_64.rpm
#   rpm-libwayland-client:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/libwayland-client-1.15.0-1.el7.x86_64.rpm
#   rpm-cairo-gobject:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/cairo-gobject-1.15.12-4.el7.x86_64.rpm
#   rpm-libgdk_pixbuf-2:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/gdk-pixbuf2-2.36.12-3.el7.x86_64.rpm
#   rpm-gtk3:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/gtk3-3.22.30-3.el7.x86_64.rpm
#   rpm-libXScrnSaver:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/libXScrnSaver-1.2.2-6.1.el7.x86_64.rpm
#   rpm-GConf2:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/GConf2-3.2.6-8.el7.x86_64.rpm
#   rpm-atk-2:
#     command: rpm -ivh --nodeps --replacepkgs http://mirror.centos.org/centos/7/os/x86_64/Packages/atk-2.28.1-1.el7.x86_64.rpm
#   yum-update:
#     command: yum update nss -y
