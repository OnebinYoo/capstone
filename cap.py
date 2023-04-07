import scapy.all as scapy

# 패킷 캡쳐 함수
def capture_packets(interface, count):
    # 캡처할 인터페이스와 캡처할 패킷 수를 설정
    capture = pcap.pcap(name=interface)
    capture.setfilter('tcp port 80')  # 필터링 조건 설정

    # 패킷을 캡처
    for timestamp, packet in capture:
        scapy_packet = scapy.IP(packet)
        if scapy_packet.haslayer(scapy.TCP) and scapy_packet.haslayer(scapy.Raw):
            print(scapy_packet.show())

        # 캡처한 패킷의 개수가 count와 같아지면 종료
        count -= 1
        if count == 0:
            break

# 패킷 캡쳐 실행
capture_packets("eth0", 10)
