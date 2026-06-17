#include <WiFi.h>
#include <HTTPClient.h>

// Replace with your network credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Replace with your backend API endpoint (Make sure your PC's IP address is used, not localhost)
const char* serverName = "http://192.168.1.100:5000/api/sensor-data";

// Timer variables
unsigned long lastTime = 0;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  // Send an HTTP POST request every 5 seconds
  if ((millis() - lastTime) > timerDelay) {
    // Check WiFi connection status
    if(WiFi.status() == WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");

      // Generate mock data (or read from real sensors here)
      float temperature = 20.0 + random(-20, 20) / 10.0; // Random temp around 20C
      float humidity = 60.0 + random(-50, 50) / 10.0;    // Random humidity around 60%
      float ethylene = 0.5 + random(-10, 10) / 100.0;    // Random ethylene around 0.5ppm

      // Prepare JSON payload
      String httpRequestData = "{\"temperature\":" + String(temperature) + 
                               ",\"humidity\":" + String(humidity) + 
                               ",\"ethylene\":" + String(ethylene) + "}";
      
      Serial.print("Sending POST request to: ");
      Serial.println(serverName);
      Serial.print("Payload: ");
      Serial.println(httpRequestData);

      // Send HTTP POST request
      int httpResponseCode = http.POST(httpRequestData);
      
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
