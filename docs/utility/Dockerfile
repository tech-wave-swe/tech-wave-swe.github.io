# Use Ubuntu as the base image
FROM ubuntu:latest

# Set noninteractive mode to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y git curl pandoc texlive texlive-latex-extra texlive-fonts-recommended texlive-xetex texlive-luatex latexmk

RUN mkdir -p ~/texmf/tex/latex/commonstuff/
RUN git clone https://github.com/tech-wave-swe/DocumentStyle.git ~/texmf/tex/latex/commonstuff/

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Verify installations
RUN node -v && npm -v

# Set working directory inside the container
WORKDIR /app

CMD ["/bin/bash"]