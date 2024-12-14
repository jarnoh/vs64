//
// Example
//

const char* hello_text = "HELLO, WORLD!";
char* screen = (char*) (0x40e);
unsigned char* color = (unsigned char*) (0xd80e);

int main() {
    unsigned char i = 0;
    char c;

    *((unsigned char*) 0xd018) = 21;

    for (;;) {
        c = (char) (hello_text[i]&0b00111111);
        if (c == '\0') break;
        screen[i] = c;
        color[i] = (unsigned char) 1;
        i++;
    }

    return 0;
}
