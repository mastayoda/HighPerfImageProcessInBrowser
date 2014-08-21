kernel void grayscale(global const uchar4 *src,
                      global uchar4 *dst,
                      uint width,
                      uint height)
{
    uint x = get_global_id(0);
    uint y = get_global_id(1);

    if (x >= width || y >= height) return;

    int i = y * width + x;
    uchar4 color = src[i];

    uchar grayscl = (uchar)(0.2126f * color.x + 0.7152f * color.y + 0.0722f * color.z);
    dst[i] = src[i];
    dst[i].x = grayscl;
    dst[i].y = grayscl;
    dst[i].z = grayscl;
}



kernel void Convolve(const __global  float * pInput,
                        __constant float * pFilter,
                        __global  float * pOutput,
                        const int nInWidth,
                        const int nFilterWidth)
{
    const int nWidth = get_global_size(0);

    const int xOut = get_global_id(0);
    const int yOut = get_global_id(1);

    const int xInTopLeft = xOut;
    const int yInTopLeft = yOut;

    float sum = 0;
    for (int r = 0; r < nFilterWidth; r++)
    {
        const int idxFtmp = r * nFilterWidth;

        const int yIn = yInTopLeft + r;
        const int idxIntmp = yIn * nInWidth + xInTopLeft;

        for (int c = 0; c < nFilterWidth; c++)
        {
            const int idxF  = idxFtmp  + c;
            const int idxIn = idxIntmp + c;
            sum += pFilter[idxF]*pInput[idxIn];
        }
    }
    const int idxOut = yOut * nWidth + xOut;
    pOutput[idxOut] = sum;
}
