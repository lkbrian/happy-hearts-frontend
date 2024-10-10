/* eslint-disable react/no-unescaped-entities */
import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import {
  FaDatabase,
  FaDna,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaRetweet,
  FaStar,
  FaTeeth,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import hospital from "../assets/doctors.png";
import "./splash.css";

function Splash() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const services = [
    {
      title: "Surgery",
      description:
        "We get insulted by others, lose trust for those we get back. People in this world shun people for being great.",
      icon: FaHeart,
    },
    {
      title: "Pediatrics",
      description:
        "We get insulted by others, lose trust for those we get back. People in this world shun people for being great. For being a bright color.",
      icon: FaDatabase,
    },
    {
      title: "Dental",
      description:
        "We get insulted by others, lose trust for those we get back. People in this world shun people for being great. For being a bright color.",
      icon: FaTeeth,
    },
    {
      title: "Orthopedics",
      description:
        "We get insulted by others, lose trust for those we get back. People in this world shun people for being great.",
      icon: FaRetweet,
    },
    {
      title: "Neurology",
      description:
        "We get insulted by others, lose trust for those we get back. People in this world shun people for being great. For being a bright color.",
      icon: FaDna,
    },
    {
      title: "Family",
      description:
        "We get insulted by others, lose trust for those we get back. People in this world shun people for being great.",
      icon: FaUser,
    },
  ];
  const testimonials = [
    {
      name: "Dr. John Doe",
      avatar:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      title: "Cardiologist",
      quote:
        "The diagnostic tools here have completely transformed my approach to treating patients. It's been a game-changer in our practice.",
      rating: 4,
      bg: "none",
    },
    {
      name: "Dr. Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      title: "Pediatrician",
      quote:
        "This platform is incredibly user-friendly, making patient management more efficient and effective. I highly recommend it to my colleagues.",
      rating: 4,
      bg: "linear(to bottom right,  rgba(65,202,227,1)25%,  rgba(33,121,243,1)100%)",
      color: "#FFF",
    },
    {
      name: "Dr. Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      title: "Orthopedic Surgeon",
      quote:
        "Using this service has improved my workflow in surgery planning and follow-ups. It’s a must-have for any modern medical professional.",
      rating: 3,
      bg: "none",
    },
  ];

  const faqData = [
    {
      question: "What is your patient admission process?",
      answer: `Our patient admission process is designed to ensure smooth and efficient service. 
    Upon arrival, patients or their representatives are required to complete necessary paperwork, which includes personal identification, 
    insurance details, and medical history. Our admissions team will assist you in verifying your insurance coverage, and once completed, 
    you will be guided to your designated room or department. We strive to minimize wait times and ensure that all patients are comfortably settled 
    as quickly as possible.`,
    },
    {
      question: "Do you offer international patient services?",
      answer: `Yes, we provide specialized services for international patients. We understand that seeking medical care abroad can be a daunting task, 
    which is why we offer dedicated assistance for international patients, including visa support, airport transfers, language interpretation, 
    and assistance with medical records. Our International Patient Coordinators will help you through every step of your treatment journey, 
    ensuring your experience is as comfortable and stress-free as possible. We also accommodate cultural preferences and dietary needs during your stay.`,
    },
    {
      question: "How can I track my lab results?",
      answer: `Once your tests are completed, you can track your lab results online via our secure patient portal. After logging in, 
    you can view your results under the "Lab Results" section. If you need assistance accessing the portal, our IT helpdesk is available 
    to guide you through the process. You can also request that results be sent directly to your physician, and in some cases, 
    the physician will review the results with you during a follow-up consultation to explain the findings and discuss any necessary treatments.`,
    },
    {
      question:
        "What payment methods and financial support options are available?",
      answer: `We accept various payment methods including all major credit cards, bank transfers, and cash payments. We also collaborate with numerous 
    insurance providers to ensure seamless billing for insured patients. For those requiring financial assistance, we offer flexible payment plans 
    and options such as healthcare credit services. Additionally, our financial counselors are available to guide you through insurance claims, 
    cost estimates, and financial aid options to help ease the financial burden during your treatment.`,
    },
    {
      question: "How can I schedule an appointment with a specialist?",
      answer: `Scheduling an appointment with one of our specialists is straightforward. You can book an appointment online through our website by selecting your 
    preferred department and specialist. Alternatively, you can call our dedicated appointment line to speak with one of our representatives. 
    If you are a new patient, we will assist you in gathering any relevant medical records or prior test results before your visit. 
    We also offer virtual consultations for certain services, allowing you to consult with a specialist from the comfort of your home.`,
    },
  ];
  const hospitalNews = [
    {
      title: "Latest Advances in Cardiology",
      description:
        "New techniques are improving heart surgery success rates. Doctors are now using AI to monitor recovery in patients post-surgery.",
      image:
        "https://images.unsplash.com/photo-1567067974934-75a3e4534c14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      timePosted: "Posted 1 hour ago",
    },
    {
      title: "New Cancer Research Breakthrough",
      description:
        "Scientists have discovered a new method to detect early-stage cancer using nanotechnology, which may revolutionize cancer diagnostics.",
      image:
        "https://images.unsplash.com/photo-1609840113564-ab4aba4956c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      timePosted: "Posted 30 minutes ago",
    },
    {
      title: "Hospital Expansion Projects in 2024",
      description:
        "Major hospitals are expanding their facilities to accommodate growing patient numbers. The new wings include state-of-the-art emergency rooms and advanced surgical suites.",
      image:
        "https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      timePosted: "Posted yesterday",
    },
  ];

  return (
    <>
      <Navbar />
      <section id="home">
        <Box
          mt="70px"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-around"
          alignItems="center"
          py="40px"
        >
          {/* Hero Section */}
          <Flex
            flexDir="column"
            maxW={{ base: "100%", md: "50%" }}
            textAlign={{ base: "center", md: "left" }}
            mb={{ base: "20px", md: "0" }}
          >
            <Box>
              <Heading display={"inline"}> Your </Heading>
              <Heading
                as={"h2"}
                bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                bgClip="text"
                display={"inline"}
              >
                Health Matters
              </Heading>
            </Box>
            <Text
              fontSize={{ base: "md", md: "md" }}
              letterSpacing="1px"
              mb="20px"
              maxW={"700px"}
            >
              Where your journey through pregnancy and motherhood is supported
              with compassionate care and expert medical services. We understand
              that this is a special time in your life, and our dedicated team
              is here to ensure both you and your baby receive the best care
              possible. From prenatal check-ups to childbirth and beyond, we
              stand by you every step of the way. We also prioritize your childs
              health with timely and effective vaccinations, ensuring they start
              life strong and healthy. Your familys well-being is our top
              priority.
            </Text>
            <Text
              as={"sub"}
              fontSize="sm"
              fontStyle="italic"
              letterSpacing={"1px"}
              mt="10px"
              mb="30px"
            >
              Safe Pregnancy, Healthy Babies, Caring Hands.
            </Text>
            <Button
              colorScheme="blue"
              size="md"
              w={"200px"}
              bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
              // bgClip="text"
              color="#fff"
            >
              Learn More
            </Button>
          </Flex>
          <Flex justifyContent="center">
            <Image
              w={{ base: "100%", md: "620px" }}
              src={hospital}
              alt="Hospital"
              borderRadius="md"
            />
          </Flex>
        </Box>
      </section>

      <section id="services">
        <Box py={5} pt={85}>
          <Box mx="auto">
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
              w={"80%"}
              mx={"auto"}
              gap={6}
            >
              <Box
                textAlign={{ base: "center", lg: "left" }}
                mb={{ base: 4, lg: 0 }}
              >
                <Box>
                  <Heading display={"inline"}> Our </Heading>
                  <Heading
                    as={"h2"}
                    bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                    bgClip="text"
                    display={"inline"}
                  >
                    Services{" "}
                  </Heading>
                  <Heading>Cover Every Area You Need</Heading>
                </Box>
                <Text mb={4}>
                  We get back stabbed by friends. It becomes harder for us to
                  give others a hand. We get our heart broken by people we love,
                  even that we give them all we have.
                </Text>
                <Button
                  bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                  variant="solid"
                  color={"#fff"}
                >
                  Read more
                </Button>
              </Box>
              <Grid
                w={"100%"}
                mx={"auto"}
                templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
                gap={6}
              >
                {services.map((service, index) => (
                  <Box
                    key={index}
                    bg={theme.colors.cards[colorMode]}
                    color={theme.colors.text[colorMode]}
                    shadow="lg"
                    p={4}
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Icon
                      as={service.icon}
                      // color="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                      color={"#2179f3"}
                      boxSize={8}
                      mb={3}
                    />
                    <Heading size="md">{service.title}</Heading>
                    <Text fontSize="sm">{service.description}</Text>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>

      <section id="about">
        <Flex
          align={"center"}
          flexDir={"column"}
          alignItems={"center"}
          mx="auto"
          p={4}
        >
          <Box>
            <Box textAlign={"center"}>
              <Heading
                bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                bgClip="text"
                as="h2"
                pt={"65px"}
              >
                What random people
              </Heading>
              <Heading as="h2">think about us</Heading>
            </Box>
          </Box>

          <Text
            lineHeight={"20px"}
            textAlign={"center"}
            textTransform={"lowercase"}
            p={"10px 0 70px 0"}
          >
            That's the main thing people are controlled by! Thoughts their
            perception of themselves!
          </Text>
          <Flex gap={4}>
            {testimonials.map((testimonial, index) => (
              <Flex
                flexDir={"column"}
                align={"center"}
                textAlign={"center"}
                key={index}
                maxW="md"
                mx="auto"
                p={4}
                borderRadius={".4rem"}
                bgGradient={testimonial.bg}
                color={testimonial.color}
              >
                <Box display="flex" alignItems="center" flexDir={"column"}>
                  <Avatar src={testimonial.avatar} size="lg" mr={4} />
                  <Stack spacing={0}>
                    <Text fontWeight="bold">{testimonial.name}</Text>
                    <Text fontSize="sm">{testimonial.title}</Text>
                  </Stack>
                </Box>
                <Text mt={2}>{testimonial.quote}</Text>
                <HStack spacing={1}>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Icon
                        key={i}
                        fontSize={"20px"}
                        as={FaStar}
                        color={
                          i < testimonial.rating ? "yellow.400" : "gray.300"
                        }
                      />
                    ))}
                </HStack>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </section>

      <section id="blog">
        <Box pt={"40px"} w={{ base: "65%", md: "80%" }} mx={"auto"}>
          <Box textAlign={"center"} pt={"85px"}>
            <Heading display={"inline"}> Our Latest</Heading>
            <Heading
              as={"h2"}
              bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
              bgClip="text"
              display={"inline"}
            >
              {" "}
              Medical{" "}
            </Heading>
            <Heading display={"inline"}>News</Heading>
            <Text
              lineHeight={"20px"}
              textAlign={"center"}
              textTransform={"lowercase"}
              p={"10px 0 40px 0"}
            >
              That's the main thing people are controlled by! Thoughts their
              perception of themselves!
            </Text>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"30px"}
            mx={"auto"}
          >
            {hospitalNews.map((news, index) => (
              <Flex key={index}>
                <Card p={0} flexGrow={1} maxW={"400px"}>
                  <CardBody>
                    <Image
                      src={news.image}
                      alt={news.title}
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{news.title}</Heading>
                      <Text>{news.description}</Text>
                      <Text color="gray.500" spacing="sm">
                        {news.timePosted}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Flex>
            ))}
          </Box>
        </Box>
      </section>
      <section id="contact">
        <Box as="section" pt={70}>
          <Container maxW="container.lg">
            <Flex align="center" justify="center" textAlign="center" mb={10}>
              <Flex flexDir={"column"} justify="center" align="center" mb={6}>
                <Flex
                  bgGradient="linear(to-r, blue.400, cyan.400)"
                  borderRadius="full"
                  boxSize={16}
                  mb={4}
                  justify="center"
                  align="center"
                  boxShadow="md"
                >
                  <Icon mx={"auto"} as={FaUser} boxSize={8} />
                </Flex>
                <Heading as="h3" size="lg" mb={2}>
                  Contact Us
                </Heading>
                <Text maxW={"md"}>
                  For further questions, including partnership opportunities,
                  please email happyhearts.info@gmail.com.com or contact using
                  our contact form.
                </Text>
              </Flex>
            </Flex>

            <Box maxW="container.md" mx="auto">
              <Box p={6} borderRadius="lg">
                <form id="contact-form" method="post">
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={6}
                  >
                    <FormControl id="first-name">
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" placeholder="eg. Michael" />
                    </FormControl>
                    <FormControl id="last-name">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" placeholder="eg. Jordan" />
                    </FormControl>
                  </Grid>

                  <FormControl id="email" mt={4}>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      placeholder="eg. michael@creative-tim.com"
                    />
                  </FormControl>

                  <FormControl id="message" mt={4}>
                    <FormLabel>Your message</FormLabel>
                    <Textarea placeholder="Type here" rows={6} />
                  </FormControl>

                  <Stack
                    direction={{ base: "column", md: "row" }}
                    mt={6}
                    align="center"
                  >
                    <Checkbox defaultChecked>
                      I agree to the{" "}
                      <Text as="u" color="blue.600" cursor="pointer">
                        Terms and Conditions
                      </Text>
                    </Checkbox>
                  </Stack>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    bgGradient="linear(to-r, blue.400, cyan.400)"
                    size="lg"
                    w="full"
                    mt={6}
                  >
                    Send Message
                  </Button>
                </form>
              </Box>
            </Box>
          </Container>
        </Box>
      </section>
      <section id="faqs">
        <Box className="navlink" w={{ base: "65%", md: "80%" }} mx={"auto"}>
          <Heading py={"40px"}>FAQ'S</Heading>
          <Accordion allowToggle>
            {faqData.map((faq, index) => (
              <AccordionItem
                bg={theme.colors.background[colorMode]}
                color={theme.colors.text[colorMode]}
                border={0}
                key={index}
              >
                <h2>
                  <AccordionButton
                    borderRadius={".4rem"}
                    _expanded={{
                      bg: theme.colors.primary[colorMode],
                      color: theme.colors.text[colorMode],
                    }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      {faq.question}
                    </Box>
                    <SmallAddIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel fontSize={"16px"} pb={4}>
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </section>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Flex
                direction="row"
                align="center"
                borderRadius={"50%"}
                alignSelf={"center"}
                m={"20px 0"}
                justifyContent={"space-evenly"}
                gap={"10px"}
              >
                <Image src={"/favicon.ico"} w="50px" alt="Clinic Logo" />
                <Text
                  fontWeight={700}
                  fontSize={"22px"}
                  bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                  bgClip="text"
                >
                  Happy Hearts
                </Text>
              </Flex>
              <Box
                alignSelf={"center"}
                flexDir={"row"}
                justifyContent={"space-evenly"}
                display="flex"
                className="social-icons"
              >
                <Box>
                  <Link href="#" isExternal>
                    <Icon as={FaTwitter} boxSize={6} />
                  </Link>
                </Box>
                <Box>
                  <Link href="#" isExternal>
                    <Icon as={FaInstagram} boxSize={6} />
                  </Link>
                </Box>
                <Box>
                  <Link href="#" isExternal>
                    <Icon as={FaFacebookF} boxSize={6} />
                  </Link>
                </Box>
              </Box>
              <p className="copyright">&copy; 2022 Happy heart by lkbrian.</p>
            </div>
            <div className="col-md-3">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Pages</h3>
              <ul>
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Register</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Legal</h3>
              <ul>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Team</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Splash;
