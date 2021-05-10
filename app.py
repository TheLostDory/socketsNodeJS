import mysql.connector
import random
import time


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Tanouche1964",
  database="testingsocket"
)

mycursor = mydb.cursor()


def randomData(): 
    n = random.randint(0,100)
    return n

def insertToDb():
    while True:
        val : int
        for x in range(5):
            val=randomData()
            
            print(val)
            query = """INSERT INTO trend_data(room1,room2,room3) VALUE (%s,%s,%s)""" % (val,val/2,val/3)  

            mycursor.execute(query)

        mydb.commit()

        print(mycursor.rowcount, "record inserted.")
        time.sleep(10)


insertToDb()

