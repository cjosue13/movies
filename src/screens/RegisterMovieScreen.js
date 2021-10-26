/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Stack,
  Text,
  TextArea,
  useToast,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {MOVIE_MUTATION} from '../graphql/movies/movies.mutation';
import Loading from '../components/Loading/Loading';

const movieState = {
  title: '',
  year: new Date(),
  description: '',
  image: '',
};

const validationsState = {
  title: false,
  description: false,
};

const RegisterMovieScreen = () => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [movie, setMovie] = useState(movieState);
  const [validations, setValidations] = useState(validationsState);
  const [loading, setLoading] = useState(false);
  const [saveMovie] = useMutation(MOVIE_MUTATION);

  const toast = useToast();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || movie.year;
    setShow(false);
    setMovie({...movie, year: currentDate});
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    if (loading) handleAddMovie();
  }, [loading]);

  const imageContent = () => {
    return (
      <Box mb="5" alignItems="center">
        <Image
          source={{uri: image.path}}
          alt={'image selected'}
          style={{width: 70, height: 70}}
        />
      </Box>
    );
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setImage({...image});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image.path;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      return null;
    }
  };

  const handleAddMovie = async () => {
    validations.title = false;
    validations.description = false;

    if (movie.title.trim() === '') {
      validations.title = true;
    }
    if (movie.description.trim() === '') {
      validations.description = true;
    }

    if (image && !validations.title && !validations.description) {
      const url = await uploadImage();
      if (url) {
        try {
          await saveMovie({
            variables: {
              input: {...movie, image: url},
            },
          });
          toast.show({
            title: 'Movie saved successfully!',
            placement: 'bottom',
          });
          setImage(null);
          setMovie(movieState);
        } catch (error) {
          toast.show({
            title: error,
            placement: 'bottom',
          });
        }
      } else {
        toast.show({
          title: 'Error storing the selected image',
          placement: 'bottom',
        });
      }
      setValidations(validationsState);
    } else {
      if (!image) {
        toast.show({
          title: 'Please select an image.',
          placement: 'bottom',
        });
      }

      setValidations({...validations});
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      w={{
        base: '100%',
        md: '90%',
      }}>
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: '100%',
          md: '25%',
        }}>
        <Heading textAlign="center">Register Movie</Heading>
        <Box>
          <FormControl isInvalid={validations.title} mb="5">
            <FormControl.Label>
              <Text>Title:</Text>
            </FormControl.Label>
            <Input
              value={movie.title}
              name="title"
              placeholder="Title..."
              onChangeText={text => setMovie({...movie, title: text})}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isInvalid={validations.description} mb="5">
            <FormControl.Label>
              <Text>Description:</Text>
            </FormControl.Label>
            <TextArea
              h={20}
              value={movie.description}
              placeholder="Description..."
              w={{
                base: '100%',
                md: '25%',
              }}
              onChangeText={text => setMovie({...movie, description: text})}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="5">
            <FormControl.Label>
              <Text>Year:</Text>
            </FormControl.Label>
            <Box>
              <Input
                name="date"
                value={movie.year.toISOString().slice(0, 10)}
                onFocus={showDatepicker}
              />
            </Box>
            <Box>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={movie.year}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </Box>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <Box>{image && imageContent()}</Box>
            <Box alignItems="center">
              <Button
                w="30%"
                borderRadius="md"
                colorScheme="secondary"
                size="sm"
                bg="#7eb2c9"
                _pressed={{bg: '#5a899e'}}
                onPress={choosePhotoFromLibrary}>
                <Text color="#ffffff">Choise a Image</Text>
              </Button>
            </Box>
          </FormControl>
        </Box>
        <Button
          mt="5"
          bg="#01234c"
          _pressed={{bg: '#06182e'}}
          onPress={() => setLoading(true)}>
          <Text color="#ffffff">Save movie</Text>
        </Button>
      </Stack>
    </ScrollView>
  );
};

export default RegisterMovieScreen;
