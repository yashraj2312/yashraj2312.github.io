from imutils.video import VideoStream
import numpy as np
import argparse
import imutils
import time
import cv2
import pyttsx3 as p
from os import system
import os
import subprocess
from tkinter import *
import imghdr as i
import smtplib
tk=Tk()
from PIL import Image
from PIL import ImageTk

print("Installing all required modules")
os.system("pip install -r requirements.txt")

e=p.init()
face_csc = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cam = cv2.VideoCapture(0)
i=0
start=0
a,b,c,d=0,0,0,0
def start_pos():
    print("[INFO] loading model...")
    net = cv2.dnn.readNetFromCaffe("deploy.prototxt.txt", "model.caffemodel")
    print("[INFO] starting video stream...")
    vs = VideoStream(src=0).start()
    time.sleep(2.0)
    fac=0
    a,b=0,0
    while True:
        command="brightness 0.1"
        frame = vs.read()
        frame = imutils.resize(frame, width=400)
        (h, w) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0,
                (300, 300), (104.0, 177.0, 123.0))
        net.setInput(blob)
        detections = net.forward()
        for i in range(0, detections.shape[2]):
                confidence = detections[0, 0, i, 2]
                if confidence < 0.7:
                        continue
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
                if endX-startX>75:
                        print("MOVE BACK")
                        a+=1
                        if a==1:
                                system("say Please move back")
                        os.system(command)
                elif endX-startX<50:
                        print("MOVE FORWARD")
                        b+=1
                        if b==1:
                                system("say Please move forward")
                        os.system(command)
                else:
                        print("GOOD POSTURE")
                        os.system("brightness 0.85")
                        a, b=0,0
                text = "{:.2f}%".format(confidence * 100)
                
                y = startY - 10 if startY - 10 > 10 else startY + 10
                cv2.rectangle(frame, (startX, startY), (endX, endY),
                              (0, 0, 255), 2)
                cv2.putText(frame, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            cv2.destroyAllWindows()
            vs.stop()
            break
def stop_pos():
    cam.release()
    cv2.destroyAllWindows()

tk.title("HeadsUp")
canvas=Canvas(width=1120,height=630,bg="white")
canvas.pack()
photo=PhotoImage(file="headsupmain.png")
photo=photo.subsample(10)
panel = Label(tk, image= photo)
canvas.create_image(560,20, anchor=N, image=photo)

canvas.create_text(250,150,text="Start your posture session:")
choose=Button(text="Start",command=start_pos).place(x=230, y=190)
canvas.create_text(560,150,text="OR")
canvas.create_text(900,150,text="Stop your posture session:")

canvas.create_text(900,200,text="To stop session, press Q")
cam.release()
cv2.destroyAllWindows()
tk.mainloop()

"""
                elif w-start<(-50):
                    print("MOVE FORWARD")
                    
                    b+=1
                    if b==1:
                        system("say Please move forward")
                    os.system(command)
"""
