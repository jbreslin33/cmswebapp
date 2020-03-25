echo ----------------------install composer------------------------
sudo apt-get -y install composer 
echo ----------------------install php mailer------------------------
composer require phpmailer/phpmailer

echo ----------------------install websocketd------------------------
sudo apt install ./websocketd-0.3.0_amd64.deb
