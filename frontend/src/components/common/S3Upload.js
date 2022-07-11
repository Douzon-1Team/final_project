import S3 from 'react-aws-s3';
import { v4 } from 'uuid';
import axios from 'axios';
import {useSelector} from "react-redux";
import {FileTypeError, ImgUploadSuccess} from "./alert/alert";
import {FcEditImage} from 'react-icons/fc';
import {IconBox} from '../../styles/ProfileStyle';

window.Buffer = window.Buffer || require("buffer").Buffer;

const S3Upload = () => {
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);

    const imagePatchConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
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
                    ReactS3Client.uploadFile(file, `profile-${empNo}-`+newFileName)
                        .then((data) => {
                            axios.post('/profile/updateImg', { empno: `${empNo}`, profile: data.location }, imagePatchConfig)
                                .then((res) => {
                                    localStorage.setItem('profile', res.data);
                                    ImgUploadSuccess();
                                    window.location.reload();
                                }).catch((err) => { console.log(err, '이미지 변경 error'); });
                        }).catch( console.log(file));
                } else {
                    FileTypeError();
                    event.target.value = null;
                }
            }
        }
    };

    return (
      <>
          <input id='icon' type='file' accept='image/*' onChange={handleClick} hidden />
          <label htmlFor='icon'>
            <IconBox>
              <FcEditImage size="20px" />
            </IconBox>
          </label>
      </>
    );
};


export default S3Upload;
