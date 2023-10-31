void setup()
{
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(A3, INPUT);
  pinMode(2, INPUT);
  
}

void loop()
{
  int valueX = analogRead(A1);
  Serial.print("X:");
  Serial.println(valueX);
  
  int valueY = analogRead(A0);
  Serial.print("Y:");
  Serial.println(valueY);

  bool fire = digitalRead(2);
  Serial.print("F:");
  Serial.println(fire);

  delay(100);
}