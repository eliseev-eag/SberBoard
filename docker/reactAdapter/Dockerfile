FROM golang:1.13-alpine AS goBuilder
WORKDIR /go/
RUN apk update && apk add --no-cache git
RUN go get -u github.com/boyter/scc/


FROM python:3.7-alpine
LABEL maintainer="SberBoard Team <sb-team@sb-team.ru>"
WORKDIR /app

COPY --from=goBuilder /go/bin/scc /bin/scc
COPY src/App.py /app/App.py
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git

CMD python3 App.py

