import p5 from 'p5';

export function sketch(p: p5) {
	p.setup = () => {
		p.createCanvas(600, 400);
	};

	let blinkInterval = 120;
	let blinking = false;

	let currentMouseX = 0;
	let currentMouseY = 0;
	const lerpAmount = 0.09;

	let currentRotationBody = 0;
	let currentRotationFace = 0;
	const rotationLerpAmount = 0.2;

	function eyeBlinkWrapper(drawEyeFunction, frameCount) {
		const blinkDuration = 10;
		const isBlinking = frameCount % blinkInterval < blinkDuration;

		if (isBlinking) {
			const progress = (frameCount % blinkInterval) / blinkDuration;

			const scaleY = 1 - Math.sin(progress * Math.PI);
			const eyeCenterY = 262.84 + 116.94 / 2;

			p.push();

			p.translate(0, eyeCenterY);
			p.scale(1, scaleY);
			p.translate(0, -eyeCenterY);

			drawEyeFunction();

			p.pop();

			blinking = true;

			return;
		}

		if (blinking) {
			blinking = false;

			// make blink twice sometimes
			if (Math.random() < 0.05) {
				blinkInterval = 11;

				return;
			}

			blinkInterval = Math.floor(Math.random() * 180) + 60;

			return;
		}

		drawEyeFunction();
	}

	function drawFace(x, y) {
		p.translate(x, y);

		function drawEyes() {
			// p.rect
			p.fill('black');
			p.noStroke();
			p.rect(303.56, 262.84, 36, 116.94, 18);

			// p.rect
			p.fill('black');
			p.noStroke();
			p.rect(133.73, 262.84, 36, 116.94, 18);
		}

		function drawBlush() {
			// p.ellipse
			p.fill('#f7d6d5');
			p.noStroke();
			p.ellipse(385.16, 433.14, 57.08, 23.88);

			// p.ellipse
			p.fill('#f7d6d5');
			p.noStroke();
			p.ellipse(96.24, 437.57, 57.08, 23.88);
		}

		// base face path
		p.fill('#f9e2d2');
		p.noStroke();
		p.beginShape();
		p.vertex(438.68, 425.49);
		p.bezierVertex(433.53, 430.85, 428.02, 435.88, 422.38, 440.71);
		p.bezierVertex(417.26, 445.09, 411.75, 450.82, 405.73, 453.75);
		p.bezierVertex(398.48, 457.27, 390.38, 459.72, 382.79, 462.45);
		p.bezierVertex(348.1, 474.93, 312.24, 484.4, 275.68, 489.64);
		p.bezierVertex(215.55, 498.25, 153.23, 495.19, 95.52, 476.4);
		p.bezierVertex(84.07, 472.67, 72.65, 468.25, 63.07, 461.01);
		p.bezierVertex(57.62, 456.89, 48.47, 446.77, 44.25, 431.54);
		p.bezierVertex(42.53, 425.32, 39.69, 415.08, 43.92, 403.18);
		p.bezierVertex(47.83, 392.2, 55.63, 385.86, 59.16, 383.33);
		p.bezierVertex(43.53, 339.62, 39.17, 291.44, 53.05, 247.15);
		p.bezierVertex(64.88, 209.41, 97.31, 175.78, 131.64, 155.6);
		p.bezierVertex(165.97, 135.41, 205.83, 125.36, 245.72, 123.48);
		p.bezierVertex(296.65, 121.09, 348.82, 132.18, 391.96, 159.07);
		p.bezierVertex(419.94, 176.52, 443.6, 200.29, 462.08, 227.35);
		p.bezierVertex(471.13, 240.61, 477.13, 252.83, 481.18, 268.19);
		p.bezierVertex(484.52, 280.88, 486.5, 294.85, 485.38, 307.94);
		p.bezierVertex(484.53, 317.84, 482.11, 327.53, 479.69, 337.17);
		p.bezierVertex(473.48, 361.97, 467.02, 387.35, 452.58, 408.54);
		p.bezierVertex(448.46, 414.59, 443.75, 420.19, 438.68, 425.47);
		p.endShape(p.CLOSE);

		// maybe hair path
		p.fill('#1c1b1a');
		p.noStroke();
		p.beginShape();
		p.vertex(343.56, 150.74);
		p.bezierVertex(343.6, 153.07, 343.7, 155.4, 343.84, 157.73);
		p.bezierVertex(346.28, 196.59, 362.19, 233.25, 381.28, 266.85);
		p.bezierVertex(390.55, 283.17, 401.13, 299.51, 416.67, 309.54);
		p.bezierVertex(426.94, 316.16, 438.9, 319.69, 448.92, 326.71);
		p.bezierVertex(452.71, 329.37, 456.3, 332.66, 458.12, 337.0);
		p.bezierVertex(459.71, 340.81, 459.81, 345.09, 459.78, 349.24);
		p.bezierVertex(459.67, 368.08, 457.68, 386.91, 453.83, 405.33);
		p.bezierVertex(471.55, 398.63, 491.54, 390.6, 507.02, 379.46);
		p.bezierVertex(516.39, 372.71, 525.57, 365.56, 533.45, 357.02);
		p.bezierVertex(558.86, 329.47, 568.46, 289.63, 567.75, 251.61);
		p.bezierVertex(566.81, 201.43, 549.19, 151.74, 518.52, 112.78);
		p.bezierVertex(503.5, 93.7, 481.44, 78.17, 460.8, 65.89);
		p.bezierVertex(423.97, 43.98, 386.53, 22.13, 345.61, 10.23);
		p.bezierVertex(312.99, 0.74, 278.59, -2.2, 244.9, 1.63);
		p.bezierVertex(178.66, 9.15, 116.39, 43.0, 69.1, 91.45);
		p.bezierVertex(43.68, 117.5, 22.06, 148.15, 9.88, 182.91);
		p.bezierVertex(-9.37, 237.84, -0.33, 303.7, 35.61, 349.54);
		p.bezierVertex(39.9, 355.01, 44.56, 360.16, 49.57, 364.94);
		p.bezierVertex(47.02, 356.03, 47.03, 345.92, 47.9, 336.67);
		p.bezierVertex(51.01, 303.88, 62.81, 272.01, 81.68, 245.43);
		p.bezierVertex(83.18, 243.32, 85.03, 241.06, 87.55, 240.86);
		p.bezierVertex(87.09, 238.39, 91.02, 237.52, 92.3, 235.39);
		p.bezierVertex(108.4, 208.63, 131.93, 187.11, 158.3, 171.24);
		p.bezierVertex(184.67, 155.37, 213.84, 144.94, 243.54, 137.64);
		p.bezierVertex(263.56, 132.71, 284.15, 129.15, 304.67, 130.8);
		p.bezierVertex(314.03, 131.55, 323.46, 133.45, 331.77, 137.96);
		p.bezierVertex(336.7, 140.64, 339.82, 146.5, 343.56, 150.76);
		p.endShape(p.CLOSE);

		// ear path
		p.fill('#f9e2d2');
		p.noStroke();
		p.beginShape();
		p.vertex(448.98, 415.48);
		p.bezierVertex(460.21, 414.33, 470.33, 408.27, 479.35, 401.48);
		p.bezierVertex(485.11, 397.14, 490.68, 392.35, 494.55, 386.27);
		p.bezierVertex(497.74, 381.25, 499.65, 375.52, 501.18, 369.77);
		p.bezierVertex(505.47, 353.59, 506.83, 335.95, 500.58, 320.41);
		p.bezierVertex(499.51, 317.74, 498.02, 314.96, 495.38, 313.81);
		p.bezierVertex(492.4, 312.51, 488.91, 313.72, 486.19, 315.49);
		p.bezierVertex(483.92, 316.96, 481.89, 318.82, 480.23, 320.96);
		p.bezierVertex(479.21, 321.33, 478.26, 322.76, 477.88, 323.77);
		p.bezierVertex(470.49, 343.63, 464.02, 363.82, 457.55, 384.0);
		p.bezierVertex(454.64, 393.08, 451.72, 402.18, 449.89, 411.54);
		p.bezierVertex(449.68, 412.6, 447.92, 415.28, 448.98, 415.48);
		p.endShape(p.CLOSE);

		eyeBlinkWrapper(drawEyes, p.frameCount);

		drawBlush();

		// mouth path
		p.fill('#e5b0ac');
		p.noStroke();
		p.beginShape();
		p.vertex(205.63, 437.27);
		p.bezierVertex(211.23, 450.95, 228.74, 455.21, 242.22, 455.17);
		p.bezierVertex(256.95, 455.13, 271.23, 448.34, 278.79, 435.41);
		p.bezierVertex(281.72, 430.4, 273.94, 425.86, 271.02, 430.87);
		p.bezierVertex(265.39, 440.5, 254.96, 445.68, 243.99, 446.14);
		p.bezierVertex(235.2, 446.51, 218.28, 444.56, 214.32, 434.89);
		p.bezierVertex(212.16, 429.6, 203.45, 431.92, 205.64, 437.28);
		p.endShape(p.CLOSE);

		p.translate(-x, -y);
	}

	function drawMiddleHair(x, y) {
		p.translate(x, y);

		// middle hair path
		p.fill('#1c1b1a');
		p.noStroke();
		p.beginShape();
		p.vertex(143.35, 235.75);
		p.bezierVertex(147.0, 249.37, 153.9, 269.43, 168.13, 292.48);
		p.bezierVertex(154.21, 292.39, 140.96, 286.62, 128.77, 279.89);
		p.bezierVertex(114.36, 271.93, 100.73, 262.43, 88.93, 250.96);
		p.bezierVertex(80.09, 242.36, 70.52, 230.72, 64.02, 220.23);
		p.bezierVertex(63.56, 224.48, 64.72, 228.72, 65.96, 232.81);
		p.bezierVertex(72.8, 255.29, 83.13, 277.67, 101.17, 292.73);
		p.bezierVertex(101.81, 293.26, 103.17, 294.07, 103.52, 293.32);
		p.bezierVertex(102.53, 294.6, 100.6, 294.54, 99.0, 294.29);
		p.bezierVertex(86.0, 292.23, 74.04, 285.83, 63.36, 278.13);
		p.bezierVertex(43.14, 263.55, 26.84, 243.77, 15.84, 221.44);
		p.bezierVertex(5.43, 200.31, -4.12, 171.74, 1.83, 148.32);
		p.bezierVertex(4.14, 139.23, 8.07, 130.66, 11.85, 122.07);
		p.bezierVertex(21.96, 99.11, 31.18, 75.62, 44.44, 54.33);
		p.bezierVertex(57.7, 33.04, 75.52, 13.77, 98.4, 3.49);
		p.bezierVertex(104.29, 0.84, 111.0, -1.2, 117.14, 0.82);
		p.bezierVertex(124.52, 3.24, 128.94, 10.79, 131.39, 18.17);
		p.bezierVertex(135.83, 31.51, 136.03, 45.84, 136.14, 59.9);
		p.bezierVertex(136.3, 79.07, 137.32, 98.24, 136.98, 117.41);
		p.bezierVertex(135.91, 176.49, 135.38, 206.03, 143.34, 235.76);
		p.endShape(p.CLOSE);

		// highlight path
		p.fill('#303030');
		p.noStroke();
		p.beginShape();
		p.vertex(18.12, 165.88);
		p.bezierVertex(18.01, 172.96, 19.31, 180.22, 23.0, 186.26);
		p.bezierVertex(23.53, 187.13, 24.16, 188.02, 25.08, 188.47);
		p.bezierVertex(26.56, 189.2, 28.43, 188.56, 29.58, 187.37);
		p.bezierVertex(32.38, 178.27, 33.11, 168.65, 32.88, 159.13);
		p.bezierVertex(32.77, 154.5, 32.29, 149.5, 29.25, 146.01);
		p.bezierVertex(25.33, 141.51, 19.68, 143.61, 18.73, 148.95);
		p.bezierVertex(17.48, 155.97, 16.03, 163.11, 15.92, 170.27);
		p.endShape(p.CLOSE);

		// highlight path
		p.fill('#303030');
		p.noStroke();
		p.beginShape();
		p.vertex(48.22, 180.73);
		p.bezierVertex(50.93, 176.0, 53.26, 168.42, 51.33, 163.01);
		p.bezierVertex(49.96, 159.15, 47.99, 159.73, 45.55, 162.62);
		p.bezierVertex(42.71, 165.99, 41.61, 170.62, 41.6, 174.91);
		p.bezierVertex(41.6, 178.73, 44.06, 187.97, 48.22, 180.73);
		p.endShape(p.CLOSE);

		p.translate(-x, -y);
	}

	function drawLeftHair(x, y) {
		p.translate(x, y);

		// left hair path
		p.fill('#1c1b1a');
		p.noStroke();
		p.beginShape();
		p.vertex(124.15, 39.12);
		p.bezierVertex(102.81, 55.1, 88.59, 78.77, 77.26, 102.9);
		p.bezierVertex(55.87, 148.45, 42.81, 200.02, 53.22, 249.26);
		p.bezierVertex(53.6, 251.07, 54.16, 253.08, 55.75, 254.02);
		p.bezierVertex(57.34, 254.96, 54.55, 253.34, 54.0, 251.57);
		p.bezierVertex(49.43, 253.69, 44.43, 249.91, 40.81, 246.41);
		p.bezierVertex(35.47, 241.24, 30.11, 236.05, 25.52, 230.2);
		p.bezierVertex(14.55, 216.2, 8.45, 198.96, 4.68, 181.58);
		p.bezierVertex(-1.57, 152.74, -1.81, 122.45, 5.43, 93.84);
		p.bezierVertex(12.67, 65.23, 27.54, 38.38, 48.97, 18.09);
		p.bezierVertex(51.66, 15.55, 54.45, 13.1, 57.54, 11.07);
		p.bezierVertex(70.6, 2.45, 89.72, -2.73, 104.79, 1.5);
		p.bezierVertex(119.86, 5.73, 132.58, 17.58, 137.87, 32.31);
		p.bezierVertex(131.36, 35.08, 129.81, 34.88, 124.14, 39.12);
		p.endShape(p.CLOSE);

		// highlight path
		p.fill('#303030');
		p.noStroke();
		p.beginShape();
		p.vertex(12.05, 118.35);
		p.bezierVertex(12.18, 121.33, 12.82, 124.89, 15.58, 126.04);
		p.bezierVertex(18.3, 127.18, 21.31, 125.18, 23.23, 122.94);
		p.bezierVertex(26.8, 118.79, 28.85, 113.57, 30.48, 108.34);
		p.bezierVertex(32.26, 102.61, 40.93, 75.2, 33.03, 72.32);
		p.bezierVertex(23.73, 68.93, 15.69, 85.24, 14.2, 91.45);
		p.bezierVertex(12.11, 100.16, 11.66, 109.43, 12.05, 118.35);
		p.endShape(p.CLOSE);

		p.translate(-x, -y);
	}

	function drawRightHair(x, y) {
		p.translate(x, y);

		// right hair path
		p.fill('#1c1b1a');
		p.noStroke();
		p.beginShape();
		p.vertex(77.94, 156.75);
		p.bezierVertex(77.66, 159.92, 77.55, 163.12, 77.71, 166.35);
		p.bezierVertex(78.25, 177.01, 78.78, 187.29, 80.98, 197.85);
		p.bezierVertex(85.72, 220.59, 94.65, 242.31, 105.75, 262.65);
		p.bezierVertex(110.88, 272.06, 118.09, 281.98, 125.67, 289.56);
		p.bezierVertex(126.22, 289.34, 126.49, 290.39, 125.99, 290.7);
		p.bezierVertex(125.49, 291.01, 124.84, 290.77, 124.31, 290.52);
		p.bezierVertex(120.34, 288.69, 116.38, 286.85, 112.41, 285.02);
		p.bezierVertex(102.72, 280.54, 92.94, 276.01, 84.39, 269.61);
		p.bezierVertex(77.06, 264.12, 70.78, 257.37, 64.66, 250.56);
		p.bezierVertex(49.12, 233.25, 34.0, 214.65, 26.93, 192.49);
		p.bezierVertex(26.44, 190.95, 27.06, 189.93, 28.35, 190.24);
		p.bezierVertex(18.91, 191.76, 7.42, 123.79, 5.91, 114.6);
		p.bezierVertex(1.12, 85.55, -0.78, 56.03, 0.29, 26.62);
		p.bezierVertex(0.47, 21.54, 0.76, 16.38, 2.53, 11.62);
		p.bezierVertex(4.3, 6.86, 7.76, 2.47, 12.56, 0.82);
		p.bezierVertex(16.49, -0.53, 20.78, 0.06, 24.89, 0.67);
		p.bezierVertex(27.53, 1.06, 30.24, 1.47, 32.55, 2.81);
		p.bezierVertex(34.38, 3.87, 35.83, 5.45, 37.26, 7.0);
		p.bezierVertex(42.67, 12.88, 48.1, 18.79, 52.38, 25.53);
		p.bezierVertex(60.53, 38.36, 64.06, 53.48, 68.41, 68.05);
		p.bezierVertex(74.52, 88.5, 82.56, 109.09, 81.23, 130.4);
		p.bezierVertex(80.67, 139.28, 78.69, 147.94, 77.93, 156.74);
		p.endShape(p.CLOSE);

		// highlight path
		p.fill('#303030');
		p.noStroke();
		p.beginShape();
		p.vertex(34.07, 171.4);
		p.bezierVertex(35.6, 173.28, 38.5, 174.83, 40.27, 173.17);
		p.bezierVertex(41.11, 172.38, 41.32, 171.14, 41.45, 170.0);
		p.bezierVertex(42.13, 164.33, 42.17, 120.82, 31.26, 127.06);
		p.bezierVertex(27.06, 129.46, 26.92, 141.31, 26.99, 145.26);
		p.bezierVertex(27.15, 153.53, 28.68, 164.78, 34.07, 171.4);
		p.endShape(p.CLOSE);

		p.translate(-x, -y);
	}

	function drawAhoge(x, y) {
		p.translate(x, y);

		// ahoge path
		p.fill('#1c1b1a');
		p.noStroke();
		p.beginShape();
		p.vertex(96.49, 92.86);
		p.bezierVertex(62.25, 82.5, 28.41, 66.93, 4.29, 40.49);
		p.bezierVertex(2.07, 38.06, -0.19, 35.18, 0.01, 31.89);
		p.bezierVertex(0.21, 28.56, 2.86, 25.95, 5.46, 23.86);
		p.bezierVertex(17.75, 13.98, 32.75, 7.84, 48.14, 4.4);
		p.bezierVertex(63.53, 0.96, 79.4, 0.14, 95.18, 0.02);
		p.bezierVertex(114.17, -0.13, 133.16, 0.73, 152.05, 2.59);
		p.bezierVertex(167.22, 4.08, 182.58, 6.29, 196.44, 12.62);
		p.bezierVertex(202.27, 15.28, 208.36, 19.48, 209.24, 25.83);
		p.bezierVertex(209.9, 30.57, 207.4, 35.19, 204.42, 38.94);
		p.bezierVertex(200.58, 43.78, 195.8, 47.87, 190.42, 50.91);
		p.bezierVertex(192.17, 46.53, 192.62, 37.56, 189.48, 34.04);
		p.bezierVertex(188.31, 32.73, 186.65, 31.96, 185.03, 31.27);
		p.bezierVertex(163.68, 22.26, 139.95, 21.23, 116.79, 20.32);
		p.bezierVertex(99.0, 19.62, 80.93, 18.95, 63.64, 23.19);
		p.bezierVertex(55.73, 25.13, 46.88, 29.45, 45.66, 37.5);
		p.bezierVertex(44.93, 42.34, 47.31, 47.14, 50.33, 50.98);
		p.bezierVertex(57.36, 59.91, 67.84, 65.4, 78.37, 69.65);
		p.bezierVertex(88.9, 73.9, 99.91, 77.19, 109.71, 82.95);
		p.bezierVertex(112.59, 84.65, 115.57, 86.84, 116.35, 90.1);
		p.bezierVertex(117.51, 95.0, 112.76, 99.7, 107.78, 100.42);
		p.bezierVertex(102.8, 101.14, 101.31, 94.33, 96.49, 92.87);
		p.endShape(p.CLOSE);

		p.translate(-x, -y);
	}

	function drawBody(x, y) {
		p.translate(x, y);

		// body path
		p.fill('#484949');
		p.stroke('#484949');
		p.beginShape();
		p.vertex(299.97, 258.24);
		p.bezierVertex(299.97, 115.89, 232.93, 0.5, 150.23, 0.5);
		p.bezierVertex(67.53, 0.5, 0.5, 115.89, 0.5, 258.24);
		p.vertex(299.97, 258.24);
		p.endShape(p.CLOSE);

		// neck p.ellipse
		p.fill('#f9e2d2');
		p.stroke('#666');
		p.strokeWeight(4);
		p.ellipse(144.52, 33.65, 88, 45.76);

		// pocket path
		p.noFill();
		p.stroke('#666');
		p.strokeWeight(4);
		p.beginShape();
		p.vertex(186.21, 103.48);
		p.vertex(236.96, 103.48);
		p.bezierVertex(238.06, 103.48, 238.96, 104.38, 238.96, 105.48);
		p.vertex(238.96, 122.09);
		p.bezierVertex(238.96, 128.71, 233.58, 134.09, 226.96, 134.09);
		p.vertex(196.21, 134.09);
		p.bezierVertex(189.59, 134.09, 184.21, 128.71, 184.21, 122.09);
		p.vertex(184.21, 105.48);
		p.bezierVertex(184.21, 104.38, 185.11, 103.48, 186.21, 103.48);
		p.endShape(p.CLOSE);

		p.translate(-x, -y);
	}

	function drawHands(x, y) {
		p.translate(x, y);

		p.fill('#f9e2d2');
		p.noStroke();
		p.ellipse(45.03, 27.02, 90.06, 54.04);

		p.fill('#f9e2d2');
		p.noStroke();
		p.ellipse(230.1, 27.02, 90.06, 54.04);

		p.translate(-x, -y);
	}

	function drawMousePointer(x, y) {
		p.push();
		p.translate(x, y);
		p.fill('red');
		p.noStroke();
		p.triangle(0, 0, 10, 5, 5, 10);
		p.pop();
	}

	function getMouseAngleInRadian(anchorX) {
		// the code is very unusable and ugly but it works :(
		// TODO: refactor base translation offset
		const adjustedAnchorX = anchorX + 120; // with p.translate offset
		const deltaX = currentMouseX - adjustedAnchorX;
		const maxDistance = 400;

		const normalizedX = Math.max(-1, Math.min(1, deltaX / maxDistance));
		const angleInRadian = normalizedX * (Math.PI / 4); // max 45 degree

		return angleInRadian / 2;
	}

	function drawRotatedBody() {
		const maxAngleDegree = 3;
		const anchorX = 244.52;
		const anchorY = 583.65;

		const angleInRadian = getMouseAngleInRadian(anchorX);
		const maxAngleRadian = (maxAngleDegree * Math.PI) / 180;

		const radian = Math.max(-maxAngleRadian, Math.min(angleInRadian, maxAngleRadian)) * -1;

		currentRotationBody = p.lerp(currentRotationBody, radian, rotationLerpAmount);

		p.push();

		p.translate(anchorX, anchorY);
		p.rotate(currentRotationBody);
		p.translate(-anchorX, -anchorY);

		drawBody(100, 450);

		p.pop();
	}

	function drawRotatedFace() {
		const maxAngleDegree = 20;
		const anchorX = 240;
		const anchorY = 320;

		const angleInRadian = getMouseAngleInRadian(anchorX);
		const maxAngleRadian = (maxAngleDegree * Math.PI) / 180;

		const radian = Math.max(-maxAngleRadian, Math.min(angleInRadian, maxAngleRadian));

		currentRotationFace = p.lerp(currentRotationFace, radian, rotationLerpAmount);

		p.push();

		p.translate(anchorX, anchorY);
		p.rotate(currentRotationFace);
		p.translate(-anchorX, -anchorY);

		drawFace(0, 0);
		drawMiddleHair(159, 18);
		drawRightHair(268, 25);
		drawLeftHair(100, 70);
		drawAhoge(180, -75);

		p.pop();
	}

	function drawMovingHands() {
		const relativeMouseX = currentMouseX - 120;
		const relativeMouseY = currentMouseY - 100;

		const baseHandsX = 137.55;
		const baseHandsY = 610;

		const deltaX = relativeMouseX - baseHandsX;
		const deltaY = relativeMouseY - baseHandsY;

		const maxMoveX = 80;
		const maxMoveY = 60;

		const constrainedDeltaX = p.constrain(deltaX, -maxMoveX, maxMoveX);
		const constrainedDeltaY = p.constrain(deltaY, -maxMoveY, maxMoveY);

		const handsX = baseHandsX + constrainedDeltaX;
		const handsY = baseHandsY + constrainedDeltaY;

		drawHands(handsX, handsY);
	}

	const photoFlashDuration = 15;
	let photoFlashTimer = 0;
	let photoTaken = false;
	function takePhotoService() {
		if (p.keyIsPressed && p.key === 'p' && !photoTaken) {
			photoTaken = true;
			photoFlashTimer = photoFlashDuration;
		}

		if (photoTaken && photoFlashTimer > 0) {
			const alpha = p.map(photoFlashTimer, 0, photoFlashDuration, 0, 255);
			p.fill(255, 255, 255, alpha);
			p.noStroke();
			p.rect(0, 0, p.width, p.p.height);

			photoFlashTimer--;

			if (photoFlashTimer <= 0) {
				photoTaken = false;
			}
		}
	}

	let cameraToggle = false;

	const keyDebounceFrame = 10;
	let debounceCameraKey = 0;
	function cameraService() {
		function drawBorder() {
			p.push();
			p.rectMode(p.CORNER);
			p.strokeWeight(30);
			p.stroke(10, 10, 10);
			p.noFill();
			p.rect(0, 0, p.width, p.height);
			p.strokeWeight(1);
			p.stroke(50);
			p.rect(22, 22, p.width - 44, p.height - 44);
			p.pop();
		}

		function drawFlower() {
			p.push();
			p.translate(45, 45);
			p.stroke(20, 20, 20, 150);
			p.strokeWeight(0.7);
			for (let i = 0; i < 14; i++) {
				p.rotate(p.PI / 7);
				p.line(0, 0, 15, 0);
			}
			p.pop();
		}

		function drawStar(x, y, size) {
			p.push();
			p.translate(x, y);
			p.rectMode(p.CENTER);
			p.noStroke();
			p.fill(20, 20, 20, 255);

			const rectWidth = size * 1.9;
			const rectHeight = 0.7;

			p.push();
			p.rotate(p.QUARTER_PI);
			p.rect(0, 0, rectWidth, rectHeight);
			p.pop();

			p.push();
			p.rotate(-p.QUARTER_PI);
			p.rect(0, 0, rectWidth, rectHeight);
			p.pop();

			p.pop();
		}

		if (p.keyIsPressed && p.key === 'c' && debounceCameraKey === 0) {
			cameraToggle = !cameraToggle;
			debounceCameraKey = keyDebounceFrame;
		}

		if (cameraToggle) {
			drawBorder();
			drawFlower();
			drawStar(p.width - 45, 45, 14);
			drawStar(p.width - 75, 45, 12);
			drawStar(p.width - 105, 45, 10);

			takePhotoService();
		}

		if (debounceCameraKey > 0) {
			debounceCameraKey--;
		}
	}

	const handsKeyDebounceFrame = 10;
	let debounceHandsKey = 0;
	let handsActive = false;
	function handsService() {
		if (p.keyIsPressed && p.key === 'h' && debounceHandsKey === 0) {
			handsActive = !handsActive;

			debounceHandsKey = handsKeyDebounceFrame;
		}

		if (handsActive) {
			drawMovingHands();
		}

		if (debounceHandsKey > 0) {
			debounceHandsKey--;
		}
	}

	const saveKeyDebounceFrame = 10;
	let debounceSaveKey = 0;
	function saveService() {
		if (debounceSaveKey > 0) {
			debounceSaveKey--;
			return;
		}

		if (p.keyIsPressed && p.key === 'g') {
			p.saveGif('result', 10);

			debounceSaveKey = saveKeyDebounceFrame;
		}
	}

	p.draw = () => {
		currentMouseX = p.lerp(currentMouseX, p.mouseX, lerpAmount);
		currentMouseY = p.lerp(currentMouseY, p.mouseY, lerpAmount);

		p.background(220);

		p.push();
		p.scale(0.6);
		p.translate(200, 20);

		drawRotatedBody();
		drawRotatedFace();

		handsService();

		p.pop();

		cameraService();

		saveService();

		// this was for debug
		// drawMousePointer(currentMouseX, currentMouseY)
	};
}
