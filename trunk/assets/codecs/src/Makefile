LDFLAGS+=-lm
CFLAGS+=-Wall

SRCS=asao2ulaw.o nelly.o nelly_tables.o ulaw.o

asao2ulaw: $(SRCS)
	$(CC) $(CFLAGS) $(SRCS) $(LDFLAGS) -o $@

nelly.o: nelly.h

asao2ulaw.o: nelly.h

clean:
	rm *.o
