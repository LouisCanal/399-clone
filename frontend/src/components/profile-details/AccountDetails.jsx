import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import instance from '../api/api_instance';
import '../../assets/styles/global.css';
import EditWindow from './EditProfileWindow';
import PostGrid from '../individual-posts/postgrid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ReactMarkdown from 'react-markdown';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function AccountDetails(props) {

  const [PublicPosts, setPublicPosts] = useState([])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState('');
  const [notepad, setNotepad] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [zeroPosts, setZeroPosts] = useState(false);
  
  useEffect(() => {
    async function GetProfileInformation() {
      try{ 
        await instance ({
          url: "/profile/get",
          method: "GET",          
      }).then((res) => {
        setBannerImage(res.data.cover_photo)
        setProfileImage(res.data.profile_pic)
        setFirstName(res.data.first_name)
        setNotepad(res.data.notepad)
        setLastName(res.data.last_name)
        setEmail(res.data.email)
        setDescription(res.data.description)
        setPublicPosts(res.data.posts)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetProfileInformation();
    } ,
    [] 
  ) 

  useEffect(() => {
    function checkZeroPosts() {
      if (PublicPosts.length !== 0) {
        setZeroPosts(true);
      } else {
        setZeroPosts(false);
      }
    }
    checkZeroPosts();
  })


  const [editing, setEditing] = useState(false);
  
  const handleTextFieldBlur = () => {
    setEditing(false);
    handleNotepadUpdate();
  };

  const handleNotepadUpdate = async () => {
    const formData = new FormData();
    formData.append('notepad', notepad);
  
    try{
      await instance.post('/profile/notepad', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        (res) => {
          
        }
      );
    } catch(e){
        //display error message (username or password incorrect)
        console.error(e)
    }
  }



  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Update windowSize whenever the window is resized
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const bannerStyle = {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage:`url(${instance.defaults.baseURL.replace("/api", "") + bannerImage})`,
    borderBottom: '3px solid white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top left',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
  };


  // Calculate the position of the overlay based on window size
  const overlayPosition = {

    top: windowSize.width < 1000 ? 100 : 100,
    left: windowSize.width < 1500 ?  100 : 390,
    width: windowSize.width < 1000 ? 600 : 800,

  };

    // Calculate the position of the overlay2 based on window size
  const overlay2Position = {

    top: windowSize.width < 1000 ? 210 : 210,
    left: windowSize.width < 1500 ?  350 : 640,
    width: windowSize.width < 1000 ? 600 : 800,

  };

  const overlayStyle = {
    position: 'absolute',
    width: '900px',
    height: '400px',
    ...overlayPosition,
  };

  const overlay2Style = {
    position: 'absolute',
    alignItems: 'left',
    width: '400px',
    height: '400px',
    ...overlay2Position,
  };


  return (
    <div>
    <div className='container-style'>


    {/* Banner and Group Bar Elements */}

        <div style={bannerStyle}></div>
        <div
          style={{
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#D9D9D9',
            
          }}
        >
        </div>

                      {/* Overlay Container for Avatar Icon and edit button*/}

        <div style={overlayStyle}>
          <Avatar
            src={instance.defaults.baseURL.replace("/api", "") + profileImage}
            sx={{
              width: '225px',
              height: '225px',
              border: '4px solid white',
              borderRadius: '50%',
              position: 'absolute',
              marginTop: '10px',
            }}
          />
          <EditWindow sx={{zIndex:1000}}/>

        </div>

                            {/* Overlay Container Account Details */}

        <div style={overlay2Style}>
          <h1 className='header-style'> { firstName } { lastName } </h1>
          <h1 className='email-header'> { email } </h1>
          <hr style={{width:'350px', border:' 2px solid #000', marginRight: '450px',zIndex:900}} />
          <p className='about-style'> { description } </p>

        </div>


    </div> {/* END OF INITIAL CONTAINER*/}

          <div style={{height: '85px', backgroundColor:'#02AEEC', display:'flex'}}>
          <div style={{flex:1, flexDirection: 'row', borderRight: '1px solid grey', height: '100%', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',}}>
            <h1 style={{textAlign: 'center', color:'white', }}>Personal Data Navigation</h1>
          </div>
          <div style={{flex:1, flexDirection: 'row', height: '100%', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',}}>
            <h1 style={{textAlign: 'center', color:'white', paddingBottom:'10px'}}>Notepad</h1>
          </div>
        </div>


        <div style={{height: '400px', backgroundColor: 'white'}}>
              <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
              <div style={{ flex: 1,borderRight: '1px solid grey', display: 'flex', overflow: 'auto'}}>
                {/* Content for the left div */}

                {!zeroPosts ? (
                    <Box sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      flexGrow: 1, 
                      width: "48.5%", 
                      padding: "5%", 
                      backgroundColor:'#35CFFF'
                    }}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px', color: 'white'}}>
                  You have no Analyses yet
                </Typography>   
                <NavLink to="/create-analysis" style={{ textDecoration: 'none'}}>
                <Button variant="contained" sx={{backgroundColor: '#02AEEC'}} style={{ marginTop:'10px'}}>Create Analysis</Button>
                </NavLink>
                  </Box>
                ) : (
                  <Box sx={{ flexGrow: 1, width: "48.5%", padding: "5%" }}>
                  <PostGrid narrow={true} post_array={PublicPosts.reverse()} />    
                </Box>
                )}

              </div>
              
              <div style={{ display: 'inline', flex: 1, alignContent: 'center', alignItems:'center', overflow: 'scroll'}}>
                          {editing ? (
                    <TextField
                      id="notepad"
                      sx={{ width: '100%', height: '100%' }}
                      multiline
                      rows={100}
                      value={notepad}
                      variant="filled"
                      onBlur={handleTextFieldBlur}
                      onChange={(e) => setNotepad(e.target.value)}
                    />
                    
                  ) : (
                    <div style={{marginLeft:'10px', marginTop:'20px'}} onClick={() => setEditing(true)}>
                      <ReactMarkdown components={{
                      p: ({ node, ...props }) => (
                        <p style={{ fontSize: '18px' }} {...props} />
                      ),
                      }}>{notepad}</ReactMarkdown>
                    </div>
                  )}
              </div>
            </div>
        </div>

    </div>
  );
}

export default AccountDetails;

