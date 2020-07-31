#include <stdio.h>
unsigned long long int hailstone_sequence(unsigned long long int num)
{
    printf("%d, ", num);
    if (num == 1)
    {
        return 1;
    }
    else if (num % 2 == 0)
    {
        return hailstone_sequence(num / 2);
    }
    else
    {
        return hailstone_sequence((3 * num) + 1);
    }
}
void main()
{
    unsigned long long int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    hailstone_sequence(num);
}
