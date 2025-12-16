#include <iostream>
#include <fstream>
#include <vector>
#include "json.hpp"

using json = nlohmann::json;

struct Appointment {
    std::string doctor;
    std::string time;
};

int main() {
    std::vector<Appointment> appointments = {
        {"Dr. Smith", "10:00 AM"},
        {"Dr. Lee", "11:00 AM"},
        {"Dr. Patel", "02:00 PM"}
    };

    // Convert to JSON
    json j = json::array();
    for (auto &a : appointments) {
        j.push_back({{"doctor", a.doctor}, {"time", a.time}});
    }

    // Write to file
    std::ofstream file("../appointments.json");  // relative to backend folder
    file << j.dump(4);
    file.close();

    std::cout << "appointments.json generated successfully!" << std::endl;
    return 0;
}
