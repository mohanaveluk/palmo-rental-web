import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-face-detection1',
  templateUrl: './face-detection.component1.html',
  styleUrls: ['./face-detection.component1.scss']
})
export class FaceDetectionComponent1 implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  private faceDetection!: FaceDetection;
  private camera!: Camera;
  isDetecting = false;
  detectionSuccess = false;
  isModelLoaded = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Initialize in ngAfterViewInit
  }

  async ngAfterViewInit() {
    await this.initializeFaceDetection();
  }

  ngOnDestroy() {
    this.stopDetection();
  }

  private async initializeFaceDetection() {
    try {
      this.faceDetection = new FaceDetection({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/${file}`;
        }
      });

      this.faceDetection.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5
      });

      this.faceDetection.onResults((results) => {
        if (results.detections && results.detections.length > 0) {
          this.detectionSuccess = true;
          this.drawResults(results);
          if (!this.isModelLoaded) {
            this.snackBar.open('Face detection model loaded successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.isModelLoaded = true;
          }
        } else {
          this.detectionSuccess = false;
        }
      });

      await this.faceDetection.initialize();

      // Set canvas dimensions
      this.canvasElement.nativeElement.width = 640;
      this.canvasElement.nativeElement.height = 480;

      // Initialize camera after face detection is ready
      this.camera = new Camera(this.videoElement.nativeElement, {
        onFrame: async () => {
          if (this.isDetecting) {
            await this.faceDetection.send({image: this.videoElement.nativeElement});
          }
        },
        width: 640,
        height: 480
      });

    } catch (error) {
      console.error('Error initializing face detection:', error);
      this.snackBar.open('Error initializing face detection model', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  async startDetection() {
    try {
      this.isDetecting = true;
      await this.camera.start();
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.snackBar.open('Error accessing camera. Please ensure camera permissions are granted.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  stopDetection() {
    this.isDetecting = false;
    this.detectionSuccess = false;
    if (this.camera) {
      this.camera.stop();
    }
  }

  private drawResults(results: any) {
    const ctx = this.canvasElement.nativeElement.getContext('2d');
    if (!ctx) return;

    const canvas = this.canvasElement.nativeElement;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.detections) {
      results.detections.forEach((detection: any) => {
        const bbox = detection.boundingBox;
        
        // Draw bounding box
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          bbox.xCenter * canvas.width - (bbox.width * canvas.width) / 2,
          bbox.yCenter * canvas.height - (bbox.height * canvas.height) / 2,
          bbox.width * canvas.width,
          bbox.height * canvas.height
        );

        // Draw keypoints
        if (detection.keypoints) {
          ctx.fillStyle = '#FF0000';
          detection.keypoints.forEach((keypoint: any) => {
            ctx.beginPath();
            ctx.arc(
              keypoint.x * canvas.width,
              keypoint.y * canvas.height,
              2,
              0,
              2 * Math.PI
            );
            ctx.fill();
          });
        }
      });
    }
  }
}