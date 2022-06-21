package com.example.final_project.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class QRService {
    public File createQR(String empno){
        String qrName = "src/main/resources/qrCode/qr-"+empno;

        QRCodeWriter qrCodeWriter = new QRCodeWriter(); // QRCode 생성
        MatrixToImageConfig matrixToImageConfig = new MatrixToImageConfig();
        //생성조건
        Map<EncodeHintType,String> hints = new HashMap<>();
        hints.put(EncodeHintType.ERROR_CORRECTION,"L");

        // QRCode 전체 크기(단위는 pixel)
        int width=500;
        int height=500;

        // bitMatrix 형식으로 QRCode 생성
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(empno, BarcodeFormat.QR_CODE, width, height);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream, matrixToImageConfig);

            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix,matrixToImageConfig);
            File saveFile = new File(qrName);
            ImageIO.write(bufferedImage, "png", saveFile);

            return saveFile;

        }catch (WriterException e){
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }

        return null;
    }
}
