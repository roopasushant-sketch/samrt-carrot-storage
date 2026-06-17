#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>

// Wi-Fi Credentials
const char *ssid = "STUDENT";
const char *password = "S";

// Backend API Endpoint
const char *serverUrl = "http://192.168.24.157:5000/api/sensor/data";

// GPIO Pins
const int RELAY_PIN = 12;
const int FAN_PIN = 14;
const int BUZZER_PIN = 27;

// Simulated Sensor Data for Demo (Replace with real sensor logic)
float temperature = 25.0;
float humidity = 50.0;
float ethylene = 0.5;
bool fanStatus = false;
bool relayStatus = false;
bool buzzerStatus = false;

void setup() {
  Serial.begin(115200);

  // Initialize GPIO
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(RELAY_PIN, LOW);
  digitalWrite(FAN_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // Connect to Wi-Fi
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Read Sensors (Simulation for this example)
    temperature = 20.0 + random(-50, 50) / 10.0;
    humidity = 40.0 + random(-100, 100) / 10.0;
    ethylene = 0.5 + random(0, 20) / 10.0;

    // Create JSON Payload
    StaticJsonDocument<200> doc;
    doc["Temperature"] = temperature;
    doc["Humidity"] = humidity;
    doc["Ethylene Gas"] = ethylene;
    doc["Fan Status"] = fanStatus;
    doc["Relay Status"] = relayStatus;
    doc["Buzzer Status"] = buzzerStatus;
    doc["Timestamp"] = millis();

    String requestBody;
    serializeJson(doc, requestBody);

    // Send POST Request
    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response Code: ");
      Serial.println(httpResponseCode);

      String payload = http.getString();
      Serial.println(payload);

      // Parse Response Commands
      StaticJsonDocument<200> responseDoc;
      deserializeJson(responseDoc, payload);

      if (responseDoc["success"] == true) {
        fanStatus = responseDoc["commands"]["fan"];
        relayStatus = responseDoc["commands"]["relay"];
        buzzerStatus = responseDoc["commands"]["buzzer"];

        // Actuate Hardware
        digitalWrite(FAN_PIN, fanStatus ? HIGH : LOW);
        digitalWrite(RELAY_PIN, relayStatus ? HIGH : LOW);
        digitalWrite(BUZZER_PIN, buzzerStatus ? HIGH : LOW);
      }
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  // Send data every 5 seconds
  delay(5000);
}
