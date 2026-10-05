---
title: "SIFT Algorithm"
number: 16
date: 2026-10-05
tag: notes
minutes: 3
---

In these notes, I walk through the foundational steps of the SIFT algorithm, beginning with Gaussian blurs, scale space generation, and constructing Difference of Gaussians (DoG) octaves. From there, I outline the process of detecting scale-space extrema across 26 neighbors, filtering low-contrast candidates, and using the Hessian matrix trace-to-determinant ratio to eliminate edge responses. Finally, I sketch out the mechanics of assigning a dominant orientation via local gradient histograms and assembling the final 128-dimensional feature descriptor from a local neighborhood.

## Transcription

# SIFT Algorithm

## Convolutions: Some tring 06 gas

Gaussian blur: vj2 ts ST  
2D Gaussian blur: 1lo x alete : tTo sta ie

$$G(x, y, \sigma) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2+y^2}{2\sigma^2}}$$  
weight kernel feature map

Convolutions: by local we A av.  
$L(x, y, \sigma) = G(x, y, \sigma) * I(x, y)$  
Gaussian $\to$ by? $\to$ spec preps:
1. Smooth continuous
2. ne onto
3. Separable: $G(x, y) = G(x) \cdot G(y)$

Blurred image at scale. Sud ed  
Scale $\sigma \to$ fine details. Laplacian $\to$ blobs.  
Large $\sigma \to$ only big structures remain.

### Scale space:
Coin on table  
Close $\to$ lot of details  
$L(x, y, \sigma_1), L(x, y, \sigma_2), L(x, y, \sigma_3) \dots$  
$\sigma_{i+1} = k \sigma_i$  
$k = 2^{\frac{1}{s}}$: Size op image more blurred than pre  
Sier op Resige + tours

Octaves: dowpeertis oP csyynuw Seabe  
After some ours: wees  
* we downsample the image by 2 $\to$ vie WR => e278:  
  $\to$ smooth transition  
  $\to$ start again  
Sor same object at different tyw -- Sone code stuyp  
We capture scale invariance. Ginepaus (Starts end nom peints > RAY & Mah grid).

Convolution Podetina: if $I(x, y) = X_k \cdot C(x, y)$  
Ri 3 & pads NZ wage + (neh wed):  
2(e) weg: TLL YB  
J Ry  
(Convolve C 1)

## Difference of Gaussians (DoG)
DoG approximation of Laplacian of Gaussian $\to \nabla^2 G$  
$L(x, y, \sigma)$

$D(x, y, \sigma) = L(x, y, k\sigma) - L(x, y, \sigma)$  
$\to$ highlight the difference.

* any major change pope ot (blobs, carence invest)
* flat regions negative

---

## Keypoint Detection: Find Extrema in Scale Space

A point a local maximum or minimum

Compare 26 neighbours:
* 8 in same image
* 9 in scale above
* 9 in scale below

Condition:  
$D(x, y, \sigma) >$ all neighbours  
$D(x, y, \sigma) <$ all neighbours

### Keypoint Localization:
$|D(x, y, \sigma)| < \text{threshold}$  
threshold = 0.03 (typical)

### Remove Edge Response:
We want corners/blobs, not edges

Hessian Matrix:  
$$H = \begin{bmatrix} D_{xx} & D_{xy} \\ D_{xy} & D_{yy} \end{bmatrix}$$  
$D_{xx} \to$ curvature in $x$ direction  
$D_{xy} = D_{yx} \to$ new n by tee  
$D_{yy} \to$ curvature in $y$ direction

So eigenvalues: $\lambda_1, \lambda_2$  
Instead of eigenvalues, SIFT uses:  
Eigenvalues: $\lambda_1, \lambda_2$  
$\to$ curvature along principal axes

Flat region: $\lambda_1 \approx 0, \lambda_2 \approx 0$  
Edge: $\lambda_1 \gg \lambda_2$ or $\lambda_2 \gg \lambda_1$  
Corner: $\lambda_1 \approx \lambda_2$ and $\lambda_1, \lambda_2 \gg 0 \to$ strong corner  
| iw bor At

$\text{Tr}(H) = \lambda_1 + \lambda_2$  
$\text{Det}(H) = \lambda_1 \lambda_2$  
TIME CONSUMING FOR EACH PIXEL

Let $r = \frac{\lambda_1}{\lambda_2}$

$$\frac{\text{Tr}(H)^2}{\text{Det}(H)} = \frac{(\lambda_1 + \lambda_2)^2}{\lambda_1 \lambda_2} = \frac{(r\lambda_2 + \lambda_2)^2}{r\lambda_2^2} = \frac{(r+1)^2}{r}$$

$\frac{\text{Tr}(H)^2}{\text{Det}(H)} > \frac{(r+1)^2}{r}$ => ce

If ratio is large $\to$ it's a edge $\to$ reject

---

## Orientation Assignment
Imagine: Detect a corner, rotate by $90^\circ$.  
U same point, bur Quaciants Change cUsedkon.

$\to$ A dominant orientation to each keypoint.

* Compute Image Gradients:  
  $G_x = L(x+1, y) - L(x-1, y)$  
  $G_y = L(x, y+1) - L(x, y-1)$  
  Magnitude: $m = \sqrt{G_x^2 + G_y^2}$  
  Orientation: $\theta = \tan^{-1}(G_y / G_x)$

* gD docak Negrieoitect frownol Keypont:  
  take a window around the keypoint: $16 \times 16$.  
  Closer weigh more $\to$ Gaussian.

* Orientation Histogram:  
  Build a histogram of gradient directions.  
  vray = |n)nh  
  hist  
  36 bins, each bin $10^\circ$, range: $0^\circ$ to $360^\circ$.  
  AW

## Descriptor: (128D Vector)
$16 \times 16$ Poyem (around keypoint)  
$4 \times 4 \times 8 = 128 \to$ total features.

## The pages

![Handwritten notes, page 1](/assets/notes/sift-algorithm/page-1.png){: .note-page loading="lazy"}

![Handwritten notes, page 2](/assets/notes/sift-algorithm/page-2.png){: .note-page loading="lazy"}

![Handwritten notes, page 3](/assets/notes/sift-algorithm/page-3.png){: .note-page loading="lazy"}

[source pdf](/assets/notes/sift-algorithm/source.pdf)
