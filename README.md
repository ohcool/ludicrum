[![Build Status](https://travis-ci.org/appsflare/ludicrum-api.svg?branch=master)](https://travis-ci.org/appsflare/ludicrum-api)
[![Code Climate](https://codeclimate.com/github/appsflare/ludicrum-api/badges/gpa.svg)](https://codeclimate.com/github/appsflare/ludicrum-api)
[![Dependency Status](https://david-dm.org/appsflare/ludicrum-api.svg)](https://david-dm.org/appsflare/ludicrum-api)

# ludicrum-api

Ludicrum is a next generation media portal being built with javascript end-to-end (with love :))

Perquisites:
java(needed by orientdb) to install

  sudo apt-get install default-jre
  
redis(used for task queing while generating thumbnails) to install

    create file /etc/apt/sources.list.d/dotdeb.org.list and fill it with the following content.

    # /etc/apt/sources.list.d/dotdeb.org.list
    deb http://packages.dotdeb.org squeeze all
    deb-src http://packages.dotdeb.org squeeze all


    Then you need to authenticate these repositories using their public key.

    wget -q -O - http://www.dotdeb.org/dotdeb.gpg | sudo apt-key add -
    And finally, update your APT cache and install Redis.

    sudo apt-get update
    sudo apt-get install redis-server

ffmpeg(used to create thumbnails) to install

  # install latest ffmpeg

  sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next
  sudo apt-get update
  sudo apt-get install ffmpeg
  
  # refer http://www.noobslab.com/2014/12/ffmpeg-returns-to-ubuntu-1410.html


The features include,




Documentation pending
