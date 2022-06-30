import S3 from 'react-aws-s3';
import { v4 } from 'uuid';
import axios from 'axios';
import {useSelector} from "react-redux";
import {FileTypeError, ImgUploadSuccess} from "./alert/alert";
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3Upload = () => {
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const imagePatchConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const handleClick = (event) => {
        const file = event.target.files[0];
        const newFileName = v4();
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        };
        const ReactS3Client = new S3(config);
        if (file) {
            if (file.size >= 1 * 1024 * 1024) {
                alert('1mb 이하의 파일만 업로드 가능합니다.');
                event.target.value = null;
            } else {
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
                    // console.log(file);
                    // ReactS3Client.uploadFile(file, 'profile_'+file.name)
                    ReactS3Client.uploadFile(file, `profile-${empNo}-`+newFileName)
                        .then((data) => {
                            axios.post('/profile/updateImg', { empno: `${empNo}`, profile: data.location }, imagePatchConfig)
                                .then((res) => {
                                    console.log(res);
                                    console.log(data);
                                    console.log('이미지 전송 완료'); //res.data, '~~'
                                    localStorage.setItem('profile', res.data);
                                    ImgUploadSuccess();
                                    window.location.reload();
                                }).catch((err) => { console.log(err, '이미지 변경 안됨'); });
                        }).catch(
                        console.log(file));
                    // (err) => console.log(err));// 여기
                } else {
                    FileTypeError();
                    event.target.value = null;
                }
            }
        }
    };
    return <input type='file' accept='image/*' onChange={handleClick} />
};

export default S3Upload;
