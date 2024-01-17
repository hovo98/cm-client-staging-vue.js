#!/bin/bash
docker tag "cm-fe:$1" "registry.digitalocean.com/cm-container-registry/cm-fe:$1"
docker push "registry.digitalocean.com/cm-container-registry/cm-fe:$1"
