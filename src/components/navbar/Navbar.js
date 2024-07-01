'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    VStack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    Image,
    useDisclosure,
    Container,
    Divider,
    HStack,
    Input, InputGroup, InputRightElement,
} from '@chakra-ui/react'
import { IconSearch, IconX, IconHeart, IconLogout, IconUser } from "@tabler/icons-react";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'
import { GetCookie, LogoutAccount } from '@/actions/auth-actions';
import { authStore } from '@/store/auth-store';
import { lato, merriweather_sans, poppins, roboto } from '@/app/fonts'

export default function Navbar() {
    const { isOpen, onToggle, onClose } = useDisclosure()
    const router = useRouter();
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)
    const { setAuth, isAuth, userInfo, setUserInfo } = authStore((state) => state);
    const [isClient, setIsClient] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsClient(true)
    }, [])
    const handleOpenUserMenu = () => {
        onClose()
        setIsOpenUserMenu(!isOpenUserMenu)
    }

    useEffect (() => {
        setIsOpenUserMenu(false)
    },[pathname])
    useEffect(() => {
        const validate = async () => {
            const { accessToken, refreshToken } = await GetCookie()
            if (isAuth) {
                if (!accessToken && !refreshToken) {
                    setAuth(false)
                    setUserInfo(null)
                }
            } else {
                if (accessToken && refreshToken) {
                    setAuth(true)
                }
            }
        }
        validate()
        setIsClient(true)
    }, [isAuth])

    const handleLogoutAccount = async () => {
        const isLogout = await LogoutAccount()
        setAuth(!isLogout)
        setUserInfo(null)
        setIsOpenUserMenu(false)
        router.push("/")
    }



    return isClient && (

        <Box width={"100%"} bg={"#fff"}
            position={"fixed"} zIndex={70000}>
            <Container pos={"relative"} maxW="96em" h={"100%"}>
                <Flex
                    h={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={"transparent"}
                    gap={8}
                    align={'center'}>
                    <Flex
                        flex={{ base: 1, md: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', md: 'none' }}>
                        <IconButton
                            onClick={() => { setIsOpenUserMenu(false); onToggle(); }}
                            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>
                    <Flex spacing={6} flex={{ base: 1, md: 0.5 }} py={2} justify={{ base: 'center', md: 'start' }}>
                        <Image _hover={{ cursor: "pointer" }} onClick={() => router.push("/")} src={"/ELibrary_Logo.png"} height={{base:"30px",md:"40px"}} />
                    </Flex>
                    <Flex width={"100%"} display={{ base: 'none', md: 'flex' }} spacing={6} flex={{ base: 1 }} py={2} justify={{ base: 'center', md: 'start' }}>

                        <DesktopNav />

                    </Flex>

                    <Stack
                        flex={{ base: 1 }}
                        justifyContent={"flex-end"}
                        direction={'row'}
                     
                        spacing={4}>
                        <InputGroup display={{base:"none", md:"block"}} borderRadius={"25px"} background={"#EAEAEA"} maxW={"300px"}>
                            <Input placeholder='Search Your Books'  />
                            <InputRightElement _hover={{ cursor: "pointer" }}>
                                <IconSearch />
                            </InputRightElement>
                        </InputGroup>
                        {
                            isAuth ? (
                                <Image cursor={"pointer"} height={"36px"} width={"36px"} onClick={handleOpenUserMenu} objectFit={"cover"} borderRadius={"50%"} src={"/assets/default_user.png"} />
                            ) : (
                                <Button
                                as={'a'}
                                display={{ base: 'inline-flex', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={"#fed238"}
                                href={'/login'}
                                _hover={{
                                    opacity: "0.7"
                                }}>
                                Login
                            </Button>
                            )
                        }
                       
                    </Stack>
                </Flex>

                <Collapse sx={{ maxW: "200px" }} in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
                {userInfo && (
                    <Box zIndex={2000} background={"#fff"}
                        borderRadius={"10px"}
                        boxShadow={"2px 4px 10px 0px rgba(148,148,148,0.56)"}
                        pos={"absolute"} bottom={"-160px"} right={"20px"}
                        display={isOpenUserMenu ? "block" : "none"}
                        width={"200px"}>
                        <VStack padding={4} pos={"relative"} spacing={"10px"} alignItems={"flex-start"}>
                            <IconButton onClick={() => setIsOpenUserMenu(false)} minW={"0px"} maxH={"0px"} pos={"absolute"} background={"none"} padding={"0px !important"} top={"13px"} right={"7px"} icon={<IconX size={"18px"} />} />
                            <HStack spacing={3}>
                                <IconUser />
                                <VStack alignItems={"flex-start"} spacing={"none"}>
                                    <Text _hover={{ color: "#FFCE1A", cursor: "pointer" }}
                                        fontWeight={pathname === "/profile" ? 500 : 400}
                                        color={pathname === "/profile" ? "#3394d7" : "#000"}
                                        className={`${roboto.className}`}
                                        onClick={() => router.push('/profile')}

                                    >
                                        {userInfo.full_name.length > 14 ? userInfo.first_name : userInfo.full_name}
                                    </Text>
                                    <Text color={"rgba(0,0,0,0.5)"} fontSize={"10px"}>
                                        Account
                                    </Text>
                                </VStack>
                            </HStack>
                            <Divider />
                            <HStack _hover={{ color: "#FFCE1A", cursor: "pointer" }} color={"rgba(0,0,0,0.6)"} spacing={3}>
                                <IconHeart />
                                <Text _hover={{ color: "#FFCE1A", cursor: "pointer" }}
                                    color={"rgba(0,0,0,0.7)"}
                                    className={`${roboto.className}`}
                                    onClick={() => router.push('/create-post')}
                                >
                                    Favourite
                                </Text>
                            </HStack>
                            <Divider />
                            <HStack _hover={{ color: "#FFCE1A", cursor: "pointer" }} color={"rgba(0,0,0,0.6)"} spacing={3}>
                                <IconLogout />
                                <Text _hover={{ color: "#FFCE1A", cursor: "pointer" }}
                                    color={"rgba(0,0,0,0.7)"}
                                    className={`${roboto.className}`}
                                    onClick={() => { handleLogoutAccount(); setIsOpenUserMenu(false); }}
                                >
                                    Logout
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = "#000"
    const linkHoverColor = "#fff"
    const popoverContentBgColor = "#fff"
    const pathname = usePathname()
    const router = useRouter()
    return (
        <Stack direction={'row'} spacing={10} justifyContent={"center"} alignItems={"flex-start"}>
            {NAV_ITEMS.map((navItem) => (
                <Box borderBottom={pathname === navItem.href.split('?')[0] ? "3px solid #fed238" : "none"} key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box

                                as='a'
                                width={"fit-content"}
                                p={2}
                                onClick={() => router.push(navItem.href)}

                                fontWeight={pathname === navItem.href.split('?')[0] ? 700 : 500}
                                color={pathname === navItem.href.split('?')[0] ? "#fed238" : linkColor}
                                lineHeight={2}
                                fontSize={'18px'}
                                _hover={{
                                    textDecoration: 'none',
                                    color: "#fed238",
                                    cursor: "pointer"
                                }}>
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontSize={'16px'}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} maxW={"250px"} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()
    const pathname = usePathname()
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                fontWeight={pathname === href ? 700 : 500}
                color={pathname === href ? "#fed238" : "#000"}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

const NAV_ITEMS = [
    {
        label: 'E-Library',
        href: '/elibrary',
    },
    {
        label: 'Contact Us',
        href: '/contact-us',
    },

]