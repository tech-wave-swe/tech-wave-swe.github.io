FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y texlive-full

WORKDIR /workspace

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
