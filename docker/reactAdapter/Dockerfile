FROM golang AS goBuilder
WORKDIR /go/
RUN go get -u github.com/boyter/scc/


FROM python:3.7-slim
LABEL maintainer="SberBoard Team <sb-team@sb-team.ru>"
WORKDIR /app

COPY --from=goBuilder /go/bin/scc /usr/local/bin/scc
COPY src/App.py /app/
RUN apt-get update && apt-get install -y git \
    && rm -rf /var/lib/apt/lists/*

CMD python3 App.py

