#!/bin/bash
# clear_ports.sh
sudo fuser -k 5173/tcp
sudo fuser -k 8000/tcp
composer run devc