import S3 from 'react-aws-s3';
import { v4 } from 'uuid';
import axios from 'axios';
import styled from 'styled-components/macro';
import { BiImageAdd } from 'react-icons/bi';
// import * as dotenv from "dotenv";
window.Buffer = window.Buffer || require("buffer").Buffer;

const ProfileUploadWrap = styled.div`
  input[id='editicon'] {
    display: none;
  }
  input[id='editicon'] + label {
    width: 1.9rem;
    height: 1.9rem;
    padding: 0.35rem 0 0 0.2rem;
    font-size: 1.2em;
    text-align: center;
    color: #333;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #f6f6f6;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    display: block;
    position: absolute;
    bottom: 0;
    right: -0.8rem;
    cursor: pointer;
  }
  input[id='editicon'] + label:hover {
    color: #fff;
    background-color: brown;
  }
`;

// dotenv.config();
// console.log((JSON.parse(localStorage.userInfo).image = data.location));
const S3Upload = () => {
    const imagePatchConfig = {
        headers: {
            // Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            'Content-Type': 'application/json',
        },
    };
    const handleClick = (event) => {
        const file = event.target.files[0];
        // const bytes = parse(file);
        // const newFileName = v4();
        // const newFileName = v4();
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
                    console.log(file);
                    console.log(`https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/profile_${file.name}`)
                    ReactS3Client.uploadFile(file, 'profile_'+file.name)
                        .then((data) => {
                        ///////
                        console.log('1234')
                        // console.log(data);
                        axios.post('/profile/update', { image: data.location }, imagePatchConfig)
                            .then((res) => {
                                console.log(res, '이미지 보내짐');
                                    localStorage.setItem(
                                        'userInfo',
                                        JSON.stringify({
                                            ...JSON.parse(localStorage.userInfo),
                                            image: data.location,
                                        })
                                    );
                                    window.location.reload();
                                // }
                            })
                            .catch((err) => {
                                console.log(err, '이미지 변경 안됨');
                            });
                    })///////
                    .catch((err) => console.log(err));
                } else {
                    alert('JPEG, PNG, JPG 파일만 업로드 가능합니다.');
                    event.target.value = null;
                }
            }
        }
    };

    return (
        <ProfileUploadWrap>
            <input id='editicon' type='file' accept='image/*' onChange={handleClick} />
            <label htmlFor='editicon'>
                <BiImageAdd />
            </label>
        </ProfileUploadWrap>
    );
};

export default S3Upload;