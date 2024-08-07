1. 通过<input type="file" />获取文件（例如图片）时，获取到的文件是一个File对象。这个File对象是Blob的子类，包含了文件的元数据（如名称，大小和类型）以及文件的实际内容；可以通过input.file[0]进行访问。

Blob子类：既File对象，是Blob的一个扩展，专门用于表示文件。File对象具有Blob的所有特性，并且添加了文件特有的属性：name、size、type

2. FileReader是一个异步API，可以读取文件内容并转换为其他格式，例如Data URL。在这个场景下使用这个API，是因为通过<input type="file" />获取的文件格式是一个File对象。如果要绘制到canvas，就可以通过FileReader转换为Data URL。

3. Data URL可以直接在image或canvas里使用。也可以将内容编码为Base64字符串

4. Blob
Binary Large Object。表示二进制数据的类，通常用于处理大量二进制数据，如图像、视频、音频等。Blob可以在Web API中用于存储和操作这些数据。






整体流程：
1. 通过<input type="file" />获取到图像。
2. 获取到的图像是一个Blob，不能直接通过image展示，更不能直接绘制到canvas。可以使用 FileReader 将其转换为 Data URL。
3. 这时候可以将Data URL放到image，在把image绘制到canvas。
4. 要进行图片压缩，可以使用canvas自带的toDataURL，这里接收一个参数：quality，通过调整quality的值(0-1)可以控制压缩后的效果