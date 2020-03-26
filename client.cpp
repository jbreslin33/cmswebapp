#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <unistd.h>
#include <arpa/inet.h>

#include <iostream>       // std::cout
#include <thread>         // std::thread, std::this_thread::sleep_for
#include <chrono>         // std::chrono::seconds


class Client
{
	public:

	char buffer[200];


	private:
  	
	int sock;
  	struct sockaddr_in sa;
  	int bytes_sent;

	public:

	Client()
	{

	}

	//void sendToServer(std::string m)
	void sendToServer(std::string s)
	{

		char cstr[s.size() + 1];
		//strcpy(cstr, s.c_str());	// or pass &s[0]
		strcpy(this->buffer, s.c_str());	// or pass &s[0]


  		//strcpy(this->buffer, "hello world!");
  		//strcpy(this->buffer, m);
  
		sock = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
  
		if (sock == -1) 
		{
      			printf("Error Creating Socket");
      			exit(EXIT_FAILURE);
		}

  		memset(&sa, 0, sizeof sa);
  
  		sa.sin_family = AF_INET;
 
  		sa.sin_addr.s_addr = inet_addr("127.0.0.1");
  
  		sa.sin_port = htons(7654);
 
  		bytes_sent = sendto(sock, buffer, strlen(buffer), 0,(struct sockaddr*)&sa, sizeof sa);
  		if (bytes_sent < 0) 
		{
    			printf("Error sending packet: %s\n", strerror(errno));
    			exit(EXIT_FAILURE);
	  	}
 
  		close(sock); 

	}

};

Client* client;
std::string msg;

void readData()
{
	while (true) 
	{
		std::string sin;
    		std::cin >> sin;
    		msg = sin;
  	}
}

void writeData()
{
	while (true) 
	{
    		//std::lock_guard<std::mutex> lock{msg_mutex};
    		if (msg.length() > 0) 
		{
      			std::cout << msg << std::endl;
			client->sendToServer(msg);
      			msg.clear();
    		}
  	}
}

int main(void)
{
	client = new Client();

	std::thread reader (readData);     
	std::thread writer (writeData);     
	reader.join();
	writer.join();

	//client->sendToServer();
  	return 0;
}
