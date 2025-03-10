#include <iostream>;
using namespace std;

int main() {
	float consumption = 0;
	float bill = 0;
	const float rate = 4.48;
	float env_fee = 0;
	float tot = 0;
	
	cout << "Water Rate Calculator" << endl;
	cout << "Enter Consumption (Cubic Meter): ";
	cin >> consumption;
	while(consumption < 0) {
		cout << "Enter Consumption (Cubic Meter): ";
		cin >> consumption;
	}
	
	
	cout << "Enter Water Bill: ";
	cin >> bill;
	
	env_fee = consumption * rate;
	tot = env_fee + bill;
	
	
	cout << "===================================================================" << endl;
	cout << "Consumption (Cubic Meter): " << consumption << endl;
	cout << "Water Bill: " << bill << endl;
	cout << "Environmental Fee: " << env_fee << endl;
	cout << "TOTAL: " << tot << endl;
	cout << "===================================================================" << endl;
	return 0;
}
