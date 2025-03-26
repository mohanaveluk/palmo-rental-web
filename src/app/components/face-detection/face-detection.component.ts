import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaceDetection } from '@mediapipe/face_detection';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-face-detection',
  templateUrl: './face-detection.component.html',
  styleUrls: ['./face-detection.component.scss']
})
export class FaceDetectionComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  private faceDetection!: FaceDetection;
  isDetecting = false;
  detectionSuccess = false;
  stream: MediaStream | null = null;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initializeFaceDetection();
  }

  private async initializeFaceDetection() {
    this.faceDetection = new FaceDetection({
      locateFile: (file) => {
        //return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/${file}`;

      }
    });

    this.faceDetection.setOptions({
        model: 'short',
      minDetectionConfidence: 0.5
    });

    this.faceDetection.onResults((results) => {
      if (results.detections.length > 0) {
        this.detectionSuccess = true;
        this.drawResults(results);
        this.snackBar.open('Face detected successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } else {
        this.detectionSuccess = false;
      }
    });
  }

  async startDetection() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      
      if (this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
        this.isDetecting = true;
        this.detectFaces();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.snackBar.open('Error accessing camera. Please ensure camera permissions are granted.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  stopDetection() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isDetecting = false;
    this.detectionSuccess = false;
    if (this.videoElement.nativeElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  private async detectFaces() {
    if (!this.isDetecting) return;

    await this.faceDetection.send({ image: this.videoElement.nativeElement });
    requestAnimationFrame(() => this.detectFaces());
  }

  private drawResults(results: any) {
    const ctx = this.canvasElement.nativeElement.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
    
    results.detections.forEach((detection: any) => {
      const bbox = detection.boundingBox;
      
      // Draw bounding box
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        bbox.xMin * this.canvasElement.nativeElement.width,
        bbox.yMin * this.canvasElement.nativeElement.height,
        (bbox.width) * this.canvasElement.nativeElement.width,
        (bbox.height) * this.canvasElement.nativeElement.height
      );
    });
  }
}