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
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    Image,
    useDisclosure,
    Container,
    Input, InputGroup, InputRightElement,
} from '@chakra-ui/react'
import { IconSearch } from "@tabler/icons-react";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'

export default function Navbar() {
    const { isOpen, onToggle, onClose } = useDisclosure()
    const router = useRouter();
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsClient(true)
    }, [])
    const handleOpenUserMenu = () => {
        onClose()
        setIsOpenUserMenu(!isOpenUserMenu)
    }

    useEffect(() => {
        setIsOpenUserMenu(false)
    }, [pathname])



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
                    </Stack>
                </Flex>

                <Collapse sx={{ maxW: "200px" }} in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
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