import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:taper/main.dart';

void main() {
  testWidgets('intro screen renders key content', (WidgetTester tester) async {
    await tester.pumpWidget(const TaperApp());
    await tester.pumpAndSettle();

    expect(find.text('AI 서비스 개발'), findsOneWidget);
    expect(find.text('교육'), findsWidgets);
    expect(find.text('CURRICULUM'), findsOneWidget);
    expect(find.text('모집 개요'), findsOneWidget);
    expect(find.text('CONTACT'), findsOneWidget);
  });

  testWidgets('curriculum tags are rendered', (WidgetTester tester) async {
    await tester.pumpWidget(const TaperApp());
    await tester.pumpAndSettle();

    expect(find.text('FastAPI'), findsOneWidget);
    expect(find.text('RAG'), findsOneWidget);
    expect(find.text('Python'), findsOneWidget);
  });
}
