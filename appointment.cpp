#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// Simple function to extract value from JSON string
string getValue(string json, string key) {
    size_t pos = json.find(key);
    if (pos == string::npos) return "";

    pos = json.find(":", pos);
    pos = json.find("\"", pos) + 1;
    size_t end = json.find("\"", pos);

    return json.substr(pos, end - pos);
}

int main() {
    // CGI header
    cout << "Content-Type: application/json\n\n";

    // Read POST data
    string input;
    getline(cin, input);

    // Extract values from JSON
    string name = getValue(input, "name");
    string age  = getValue(input, "age");
    string doctor = getValue(input, "doctor");

    // Save appointment to file
    ofstream file("appointments.txt", ios::app);
    file << name << " | " << age << " | " << doctor << endl;
    file.close();

    // Send JSON response to frontend
    cout << "{";
    cout << "\"status\":\"success\",";
    cout << "\"message\":\"Appointment booked successfully\",";
    cout << "\"name\":\"" << name << "\"";
    cout << "}";

    return 0;
}
